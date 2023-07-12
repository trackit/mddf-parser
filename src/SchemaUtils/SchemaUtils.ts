import { PathStep } from '../ObjectPath/ObjectPath';

export interface JSONSchema {
  $schema?: string;
  definitions?: Record<string, JSONSchema>;
  properties?: Record<string, JSONSchema>;
  additionalProperties?: boolean;
  required?: string[];
  type?: string;
  items?: JSONSchema;
  minItems?: number;
  $ref?: string;
}

export default class SchemaUtils {
  public accessDefinition(schema: JSONSchema, path: PathStep[]): JSONSchema | undefined {
    return path.reduce<JSONSchema | undefined>((current, part) => {
      if (!current) {
        // If current is undefined, the path does not exist in the schema
        return undefined;
      }

      if (this.isPropertyArray(current, part.propertyName)) {
        const nextSchema = current.items?.properties[part.propertyName] as JSONSchema;
        return this.handleNextSchema(schema, nextSchema);
      }

      // If current is an object, move to the next part of the path
      if (current.properties && current.properties[part.propertyName]) {
        const nextSchema = current.properties[part.propertyName] as JSONSchema;
        if (nextSchema.type === 'array') {
          if (part.arrayIndex !== undefined) {
            return this.handleNextSchema(schema, nextSchema.items as JSONSchema);
          }
          return this.handleNextSchemaArray(schema, nextSchema);
        }

        return this.handleNextSchema(schema, nextSchema);
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

  private handleNextSchema(schema: JSONSchema, schemaPart: JSONSchema): JSONSchema | undefined {
    if (this.isReference(schemaPart)) {
      return this.getDefinition(schema, schemaPart.$ref);
    }

    if (this.isArrayDefinition(schemaPart)) {
      if (this.isArrayReference(schemaPart)) {
        return this.getDefinition(schema, schemaPart.items.$ref);
      }
      return schemaPart.items;
    }

    return schemaPart;
  }

  private handleNextSchemaArray(schema: JSONSchema, schemaPart: JSONSchema): JSONSchema | undefined {
    const nextPart = { type: 'array', items: {} } as JSONSchema;

    if (this.isArrayDefinition(schemaPart)) {
      if (this.isArrayReference(schemaPart)) {
        nextPart.items = this.getDefinition(schema, schemaPart.items.$ref);
        return nextPart;
      }
      nextPart.items = schemaPart.items;
      return nextPart;
    }
    return schemaPart;
  }

  private isPropertyArray(schema: JSONSchema, part: string): schema is { type: 'array'; items: { properties: Record<string, JSONSchema> } } {
    return (schema.type === 'array' && !!schema.items?.properties && !!schema.items?.properties[part]);
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
