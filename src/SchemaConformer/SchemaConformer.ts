import SchemaUtils, { JSONSchema } from '../SchemaUtils/SchemaUtils';
import ObjectPathUtils, { ObjectPath, PathStep } from '../ObjectPath/ObjectPath';
import ObjectUtils from '../ObjectUtils/ObjectUtils';

export type Primitive = string | number | boolean | null;

export default class SchemaConformer {
  private schemaUtils = new SchemaUtils();

  private objectUtils = new ObjectUtils();

  constructor(private schema: JSONSchema, private charkey: string = 'Value') {
    this.schema = schema;
  }

  public conform(root: Record<string, unknown>): void {
    if (!this.isObject(root)) {
      throw new Error('The object to conform must be an object.');
    }
    if (!this.schema.properties) {
      throw new Error('The schema must have properties.');
    }

    ObjectPathUtils.objectPathFromObject(root).forEach((pathStep: PathStep) => {
      this.conformRecursive(root, [pathStep]);
    });
  }

  public conformRecursive(root: Record<string, unknown>, pathStack: ObjectPath): void {
    const current = this.objectUtils.getDeepProperty(root, pathStack);
    const currentSchema = this.schemaUtils.accessDefinition(this.schema, pathStack);

    this.validateCurrentSchemaAndObject(currentSchema, current, pathStack);

    if (this.isPrimitiveSchema(currentSchema)) {
      this.conformPrimitive(root, current, pathStack);
    }

    if (this.isArraySchema(currentSchema)) {
      this.conformArray(root, pathStack, current);
    }

    if (this.isObjectSchema(currentSchema)) {
      this.conformObject(root, current, pathStack);
    }
  }

  public conformPrimitive(root: Record<string, unknown>, current: unknown, pathStack: PathStep[]): void {
    if (this.isObject(current)) {
      if (current[this.charkey]) {
        this.objectUtils.setDeepProperty(root, pathStack, current[this.charkey]);
      }
      return;
    }
    throw new Error(`The object ${current} must be a primitive or an object with a "${this.charkey}" property.`);
  }

  private conformObject(root: Record<string, unknown>, current: unknown, pathStack: PathStep[]): void {
    if (this.isObject(current)) {
      ObjectPathUtils.objectPathFromObject(current).forEach((pathStep: PathStep) => {
        this.conformRecursive(root, [...pathStack, pathStep]);
      });
    }
  }

  public conformArray(root: Record<string, unknown>, pathStack: PathStep[], current: unknown): void {
    if (this.isArray(current)) {
      this.recurseOverArray(root, current, pathStack);
    } else if (this.isObject(current)) {
      this.wrapSingleObjectInArray(root, current, pathStack);
    }
  }

  private recurseOverArray(root: Record<string, unknown>, current: unknown[], pathStack: PathStep[]): void {
    current.forEach((element: unknown, index: number) => {
      const lastStep: PathStep = {
        propertyName: pathStack[pathStack.length - 1].propertyName,
        arrayIndex: index,
      };

      this.conformRecursive(root, this.replaceLastPathStep(pathStack, lastStep));
    });
  }

  private wrapSingleObjectInArray(root: Record<string, unknown>, current: object, pathStack: PathStep[]): void {
    this.objectUtils.setDeepProperty(root, pathStack, [current]);

    const lastStep: PathStep = {
      propertyName: pathStack[pathStack.length - 1].propertyName,
      arrayIndex: 0,
    };

    this.conformRecursive(root, this.replaceLastPathStep(pathStack, lastStep));
  }

  private validateCurrentSchemaAndObject(currentSchema: unknown, current: unknown, pathStack: ObjectPath): asserts currentSchema is JSONSchema {
    if (!currentSchema) {
      throw new Error(`The path ${pathStack} does not exist in the schema.`);
    }

    if (!current) {
      throw new Error(`The path ${pathStack} does not exist in the object.`);
    }
  }

  private replaceLastPathStep(pathStack: ObjectPath, lastStep: PathStep): PathStep[] {
    return [...pathStack.slice(0, pathStack.length - 1), lastStep];
  }

  public isPrimitiveSchema(schema: JSONSchema): boolean {
    return schema.type === 'string'
      || schema.type === 'number'
      || schema.type === 'boolean'
      || schema.type === 'null'
      || schema.type === 'integer';
  }

  public isPrimitive(root: unknown): root is Primitive {
    return typeof root === 'string'
      || typeof root === 'number'
      || typeof root === 'boolean'
      || root === null;
  }

  public isObjectSchema(schema: JSONSchema): boolean {
    return schema.type === 'object' || !!schema.properties;
  }

  public isArraySchema(schema: JSONSchema): boolean {
    return schema.type === 'array';
  }

  public getSchema(): object {
    return this.schema;
  }

  private isObject(root: unknown): root is Record<string, unknown> {
    return typeof root === 'object' && root !== null && !Array.isArray(root);
  }

  private isArray(root: unknown): root is unknown[] {
    return Array.isArray(root);
  }
}
