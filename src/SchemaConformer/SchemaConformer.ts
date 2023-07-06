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

  public conform(rawObject: Record<string, unknown>): void {
    if (!this.isObject(rawObject)) {
      throw new Error('The object to conform must be an object.');
    }
    if (!this.schema.properties) {
      throw new Error('The schema must have properties.');
    }

    ObjectPathUtils.fromObject(rawObject).forEach((pathStep: PathStep) => {
      this.conformRecursive(rawObject, [pathStep]);
    });
  }

  public conformRecursive(rawObject: Record<string, unknown>, pathStack: ObjectPath): void {
    const currentObject = this.objectUtils.getDeepProperty(rawObject, pathStack);
    const currentSchema = this.schemaUtils.accessDefinition(this.schema, pathStack);

    this.validateCurrentSchemaAndObject(currentSchema, currentObject, pathStack);

    if (this.isPrimitiveSchema(currentSchema)) {
      this.objectUtils.setDeepProperty(rawObject, pathStack, this.conformPrimitive(currentObject));
    }

    if (this.isArraySchema(currentSchema)) {
      this.conformArray(rawObject, pathStack, currentObject);
    }

    if (this.isObjectSchema(currentSchema)) {
      this.handleObjectForObjectSchema(rawObject, currentObject, pathStack);
    }
  }

  public conformPrimitive(rawObject: unknown): Primitive {
    if (this.isObject(rawObject)) {
      if (rawObject[this.charkey]) {
        return rawObject[this.charkey] as Primitive;
      }
    }
    if (this.isPrimitive(rawObject)) {
      return rawObject;
    }
    throw new Error(`The object ${rawObject} must be a primitive or an object with a "${this.charkey}" property.`);
  }

  private handleObjectForObjectSchema(rawObject: Record<string, unknown>, currentObject: unknown, pathStack: PathStep[]): void {
    if (this.isObject(currentObject)) {
      ObjectPathUtils.fromObject(currentObject).forEach((pathStep: PathStep) => {
        this.conformRecursive(rawObject, [...pathStack, pathStep]);
      });
    }
  }

  public conformArray(rawObject: Record<string, unknown>, pathStack: PathStep[], currentObject: unknown): void {
    if (this.isArray(currentObject)) {
      this.handleArrayForArraySchema(rawObject, currentObject, pathStack);
    } else if (this.isObject(currentObject)) {
      this.handleObjectForArraySchema(rawObject, currentObject, pathStack);
    }
  }

  private handleArrayForArraySchema(rawObject: Record<string, unknown>, currentObject: unknown[], pathStack: PathStep[]): void {
    currentObject.forEach((element: unknown, index: number) => {
      const lastStep: PathStep = {
        propertyName: pathStack[pathStack.length - 1].propertyName,
        arrayIndex: index,
      };

      this.conformRecursive(rawObject, this.appendToPathStack(pathStack, lastStep));
    });
  }

  private handleObjectForArraySchema(rawObject: Record<string, unknown>, currentObject: object, pathStack: PathStep[]): void {
    this.objectUtils.setDeepProperty(rawObject, pathStack, [currentObject]);

    const lastStep: PathStep = {
      propertyName: pathStack[pathStack.length - 1].propertyName,
      arrayIndex: 0,
    };

    this.conformRecursive(rawObject, this.appendToPathStack(pathStack, lastStep));
  }

  private validateCurrentSchemaAndObject(currentSchema: unknown, currentObject: unknown, pathStack: ObjectPath): asserts currentSchema is JSONSchema {
    if (!currentSchema) {
      throw new Error(`The path ${pathStack} does not exist in the schema.`);
    }

    if (!currentObject) {
      throw new Error(`The path ${pathStack} does not exist in the object.`);
    }
  }

  private appendToPathStack(pathStack: ObjectPath, lastStep: PathStep): PathStep[] {
    return [...pathStack.slice(0, pathStack.length - 1), lastStep];
  }

  public isPrimitiveSchema(schema: JSONSchema): boolean {
    return schema.type === 'string'
      || schema.type === 'number'
      || schema.type === 'boolean'
      || schema.type === 'null'
      || schema.type === 'integer';
  }

  public isPrimitive(rawObject: unknown): rawObject is Primitive {
    return typeof rawObject === 'string'
      || typeof rawObject === 'number'
      || typeof rawObject === 'boolean'
      || rawObject === null;
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

  private isObject(rawObject: unknown): rawObject is Record<string, unknown> {
    return typeof rawObject === 'object' && rawObject !== null && !Array.isArray(rawObject);
  }

  private isArray(rawObject: unknown): rawObject is unknown[] {
    return Array.isArray(rawObject) && rawObject.length > 0;
  }
}
