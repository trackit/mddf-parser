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
    return path.reduce<JSONSchema | undefined>((current, part) => {
      if (!current) {
        // If current is undefined, the path does not exist in the schema
        return undefined;
      }

      if (current.type === 'array' && current.items?.properties && current.items?.properties[part]) {
        // eslint-disable-next-line no-param-reassign
        current = current.items?.properties[part] as JSONSchema;
        return this.handleNextSchema(schema, current);
      }

      // If current is an object, move to the next part of the path
      if (current.properties && current.properties[part]) {
        // eslint-disable-next-line no-param-reassign
        current = current.properties[part] as JSONSchema;

        if (current.type === 'array') {
          return this.handleNextSchemaArray(schema, current);
        }

        return this.handleNextSchema(schema, current);
      }

      return undefined;
    }, schema);
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

  private handleNextSchemaArray(schema: JSONSchema, current: JSONSchema): JSONSchema | undefined {
    if (this.isArrayDefinition(current)) {
      if (this.isArrayReference(current)) {
        // eslint-disable-next-line no-param-reassign
        current = { type: 'array', items: this.getDefinition(schema, current.items.$ref) } as JSONSchema;
        return current;
      }
      // eslint-disable-next-line no-param-reassign
      current = { type: 'array', items: current.items } as JSONSchema;
      return current;
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
