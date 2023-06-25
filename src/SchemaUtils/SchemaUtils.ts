export interface JSONSchema {
  $schema?: string;
  definitions?: Record<string, JSONSchema>;
  properties?: Record<string, JSONSchema>;
  required?: string[];
  type?: string;
  items?: JSONSchema;
  minItems?: number;
  $ref?: string;
}

export default class SchemaUtils {
  public accessDefinition(schema: JSONSchema, path: string[]): JSONSchema | undefined {
    // Start from the root of the schema
    let current: JSONSchema | undefined = schema;

    // Traverse the path
    // eslint-disable-next-line no-restricted-syntax
    for (const part of path) {
      if (!current) {
        // If current is undefined, the path does not exist in the schema
        return undefined;
      }

      // If current is an object, move to the next part of the path
      // @ts-ignore
      if (current.properties && current.properties[part]) {
        // @ts-ignore
        current = current.properties[part] as JSONSchema;

        current = this.handleNextSchema(schema, current);
      } else {
        current = undefined;
      }
    }

    return current;
  }

  public getDefinition(schema: JSONSchema, ref: string): JSONSchema | undefined {
    // Check if the reference string is formatted correctly
    if (!ref.startsWith('#/definitions/')) {
      throw new Error('Invalid reference string. It should start with "#/definitions/".');
    }

    // Remove the leading '#/definitions/' from the reference string
    const definitionKey = ref.substring('#/definitions/'.length);

    // Access and return the definition
    return schema.definitions?.[definitionKey];
  }

  private handleNextSchema(schema: JSONSchema, current: JSONSchema): JSONSchema | undefined {
    if (this.isReference(current)) {
      return this.getDefinition(schema, current.$ref);
    }

    if (this.isArrayDefinition(current)) {
      if (this.isArrayReference(current)) {
        return this.getDefinition(schema, current.items.$ref);
      }
      return current.items;
    }

    return current;
  }

  private isReference(schema: JSONSchema): schema is { $ref: string } {
    return !!schema.$ref;
  }

  private isArrayDefinition(schema: JSONSchema): schema is { items: JSONSchema } {
    return !!schema.items;
  }

  private isArrayReference(schema: JSONSchema): schema is { items: { $ref: string } } {
    return this.isArrayDefinition(schema) && !!schema.items.$ref;
  }
}
