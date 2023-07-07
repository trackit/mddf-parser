import {JSONSchema} from "../SchemaUtils/SchemaUtils";

export default class SchemaCharKey {
  private charKey: string = 'charKey';

  constructor(private readonly schema: JSONSchema) {
    this.schema = schema;
  }

  private processSchema(object: JSONSchema): void {
    let props = object.properties
    let required = object.required

    if (!props)
      return
    Object.keys(props).forEach((key: string) => {
      if (!props)
        throw new Error('The schema must have properties.')
      if (key === 'Value'
        || (required && !required.includes(key))) {
        props[this.charKey] = props[key]
        delete props[key]
      } else {
        if (this.isObjectSchema(props[key]))
          this.processAdditionalProperties(props[key])
        this.processSchema(props[key])
      }
    });
  }

  private processAdditionalProperties(object: JSONSchema): void {
    if (this.isObjectSchema(object)) {
      // @ts-ignore
      object['additionalProperties'] = false
    }
  }

  public process(): void {
    let object
    let definitions : Record<string, JSONSchema> | undefined

    if (!this.schema)
      throw new Error('The schema must be defined.')
    definitions = this.schema.definitions
    if (!definitions)
      throw new Error('The schema must have definitions.')
    Object.keys(definitions).forEach((key: string) => {
      if (!definitions)
        throw new Error('The schema must have definitions.')
      object = definitions[key]
      if (!object)
        throw new Error('The schema cant be undefined.')
      this.processSchema(object)
      this.processAdditionalProperties(object)
    });
  }

  private isObjectSchema(schema: JSONSchema): boolean {
    return schema.type === 'object' || !!schema.properties;
  }

  private isArraySchema(schema: JSONSchema): boolean {
    let isArray = false;
    if (schema.properties) {
      Object.keys(schema.properties).forEach((key: string) => {
        if (schema.properties) {
          if (schema.properties[key].type === 'array') {
            isArray = true;
          }
        }
      });
    }
    return isArray;
  }
}