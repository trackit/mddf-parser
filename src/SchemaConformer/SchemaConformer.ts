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

  public conform(rootObject: Record<string, unknown>): void {
    if (!this.isObject(rootObject)) {
      throw new Error('The object to conform must be an object.');
    }
    if (!this.schema.properties) {
      throw new Error('The schema must have properties.');
    }

    ObjectPathUtils.fromObject(rootObject).forEach((pathStep: PathStep) => {
      this.conformRecursive(rootObject, [pathStep]);
    });
  }

  public conformRecursive(rootObject: Record<string, unknown>, pathStack: ObjectPath): void {
    const currentObject = this.objectUtils.getDeepProperty(rootObject, pathStack);
    const currentSchema = this.schemaUtils.accessDefinition(this.schema, pathStack);

    this.validateCurrentSchemaAndObject(currentSchema, currentObject, pathStack);

    if (this.isPrimitiveSchema(currentSchema)) {
      this.conformPrimitive(rootObject, currentObject, pathStack);
    }

    if (this.isArraySchema(currentSchema)) {
      this.conformArray(rootObject, pathStack, currentObject);
    }

    if (this.isObjectSchema(currentSchema)) {
      this.conformObject(rootObject, currentObject, pathStack);
    }
  }

  public conformPrimitive(rootObject: Record<string, unknown>, currentObject: unknown, pathStack: PathStep[]): void {
    if (this.isObject(currentObject)) {
      if (currentObject[this.charkey]) {
        this.objectUtils.setDeepProperty(rootObject, pathStack, currentObject[this.charkey]);
      }
      return;
    }
    throw new Error(`The object ${currentObject} must be a primitive or an object with a "${this.charkey}" property.`);
  }

  private conformObject(rootObject: Record<string, unknown>, currentObject: unknown, pathStack: PathStep[]): void {
    if (this.isObject(currentObject)) {
      ObjectPathUtils.fromObject(currentObject).forEach((pathStep: PathStep) => {
        this.conformRecursive(rootObject, [...pathStack, pathStep]);
      });
    }
  }

  public conformArray(rootObject: Record<string, unknown>, pathStack: PathStep[], currentObject: unknown): void {
    if (this.isArray(currentObject)) {
      this.recurseOverArray(rootObject, currentObject, pathStack);
    } else if (this.isObject(currentObject)) {
      this.wrapSingleObjectInArray(rootObject, currentObject, pathStack);
    }
  }

  private recurseOverArray(rootObject: Record<string, unknown>, currentObject: unknown[], pathStack: PathStep[]): void {
    currentObject.forEach((element: unknown, index: number) => {
      const lastStep: PathStep = {
        propertyName: pathStack[pathStack.length - 1].propertyName,
        arrayIndex: index,
      };

      this.conformRecursive(rootObject, this.replaceLastPathStep(pathStack, lastStep));
    });
  }

  private wrapSingleObjectInArray(rootObject: Record<string, unknown>, currentObject: object, pathStack: PathStep[]): void {
    this.objectUtils.setDeepProperty(rootObject, pathStack, [currentObject]);

    const lastStep: PathStep = {
      propertyName: pathStack[pathStack.length - 1].propertyName,
      arrayIndex: 0,
    };

    this.conformRecursive(rootObject, this.replaceLastPathStep(pathStack, lastStep));
  }

  private validateCurrentSchemaAndObject(currentSchema: unknown, currentObject: unknown, pathStack: ObjectPath): asserts currentSchema is JSONSchema {
    if (!currentSchema) {
      throw new Error(`The path ${pathStack} does not exist in the schema.`);
    }

    if (!currentObject) {
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

  public isPrimitive(rootObject: unknown): rootObject is Primitive {
    return typeof rootObject === 'string'
      || typeof rootObject === 'number'
      || typeof rootObject === 'boolean'
      || rootObject === null;
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

  private isObject(rootObject: unknown): rootObject is Record<string, unknown> {
    return typeof rootObject === 'object' && rootObject !== null && !Array.isArray(rootObject);
  }

  private isArray(rootObject: unknown): rootObject is unknown[] {
    return Array.isArray(rootObject);
  }
}
