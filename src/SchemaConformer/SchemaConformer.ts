import SchemaUtils, { JSONSchema } from '../SchemaUtils/SchemaUtils';
import ObjectPathUtils, { ObjectPath, PathStep } from '../ObjectPath/ObjectPath';
import ObjectUtils from '../ObjectUtils/ObjectUtils';

export type Primitive = string | number | boolean | null;

export type ArrayElement = {
  [key: string]: unknown[];
};

export default class SchemaConformer {
  private schemaUtils = new SchemaUtils();

  private objectUtils = new ObjectUtils();

  constructor(private schema: JSONSchema, private charkey: string = 'Value') {
    this.schema = schema;
  }

  conform(rawObject: Record<string, unknown>): void {
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

    if (!currentSchema) {
      throw new Error(`The path ${pathStack} does not exist in the schema.`);
    }

    if (!currentObject) {
      throw new Error(`The path ${pathStack} does not exist in the object.`);
    }

    if (this.isPrimitiveSchema(currentSchema)) {
      this.objectUtils.setDeepProperty(rawObject, pathStack, this.conformPrimitive(currentObject));
    }

    if (this.isArraySchema(currentSchema)) {
      if (Array.isArray(currentObject)) {
        currentObject.forEach((element: unknown, index: number) => {
          const lastStep: PathStep = { propertyName: pathStack[pathStack.length - 1].propertyName, arrayIndex: index };
          this.conformRecursive(rawObject, [...pathStack.slice(0, pathStack.length - 1), lastStep]);
        });
      } else if (this.isObject(currentObject)) {
        this.objectUtils.setDeepProperty(rawObject, pathStack, [currentObject]);
        const lastStep: PathStep = { propertyName: pathStack[pathStack.length - 1].propertyName, arrayIndex: 0 };
        this.conformRecursive(rawObject, [...pathStack.slice(0, pathStack.length - 1), lastStep]);
      }
    }

    if (this.isObjectSchema(currentSchema)) {
      if (this.isObject(currentObject)) {
        ObjectPathUtils.fromObject(currentObject).forEach((pathStep: PathStep) => {
          this.conformRecursive(rawObject, [...pathStack, pathStep]);
        });
      }
    }
  }

  public conformPrimitive(rawObject: unknown): Primitive | Primitive[] {
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

  public conformArrayCharKey(rawObject: unknown): Primitive[] {
    const transformedRawObject = (rawObject as Record<string, unknown>[]).map((item) => {
      if (this.charkey in item) {
        return item.Value;
      }
      return item;
    });
    return transformedRawObject as Primitive[];
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

  getSchema(): object {
    return this.schema;
  }

  private isObject(rawObject: any): rawObject is Record<string, unknown> {
    return typeof rawObject === 'object' && rawObject !== null && !Array.isArray(rawObject);
  }

  private isArray(rawObject: any): rawObject is unknown[] {
    return Array.isArray(rawObject);
  }
}
