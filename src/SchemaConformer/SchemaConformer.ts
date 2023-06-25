import * as path from 'path';
import SchemaUtils, { JSONSchema } from '../SchemaUtils/SchemaUtils';
import ObjectPathUtils, { ObjectPath } from '../ObjectPath/ObjectPath';
import ObjectUtils from '../ObjectUtils/ObjectUtils';

export default class SchemaConformer {
  private schemaUtils = new SchemaUtils();

  private objectUtils = new ObjectUtils();

  constructor(private schema: JSONSchema) {
    this.schema = schema;
  }

  conform(rawObject: Record<string, unknown>): Record<string, unknown> {
    const pathStack: ObjectPath[] = [];

    if (!this.isObject(rawObject)) {
      throw new Error('The object to conform must be an object.');
    }
    if (!this.schema.properties) {
      throw new Error('The schema must have properties.');
    }

    pathStack.push(ObjectPathUtils.fromObject(rawObject));
  }

  public conformRecursive(rawObject: Record<string, unknown>, pathStack: ObjectPath): Record<string, unknown> {
    const currentObject = this.objectUtils.getDeepProperty(rawObject, pathStack);
    const currentSchema = this.schemaUtils.accessDefinition(this.schema, ObjectPathUtils.toStringArray(pathStack));
  }

  public isPrimitiveFixable(schema: JSONSchema, rawObject: unknown): boolean {
    if (typeof rawObject === 'string' && schema.type === 'string') {
      return true;
    }
    if (typeof rawObject === 'number' && schema.type === 'number') {
      return true;
    }
    if (typeof rawObject === 'boolean' && schema.type === 'boolean') {
      return true;
    }
    return false;
  }

  getSchema(): object {
    return this.schema;
  }

  private isObject(rawObject: any): rawObject is Record<string, unknown> {
    return typeof rawObject === 'object' && rawObject !== null && !Array.isArray(rawObject);
  }
}
