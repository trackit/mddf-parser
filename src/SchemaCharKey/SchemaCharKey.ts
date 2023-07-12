import { JSONSchema } from '../SchemaUtils/SchemaUtils';

export default class SchemaCharKey {
  constructor(private readonly schema: JSONSchema, private readonly charKey: string = 'charKey') {
    this.process();
  }

  private process() {
    const { definitions } = this.schema;
    if (!definitions) { throw new Error('The schema must have definitions.'); }
    Object.keys(definitions).forEach((key: string) => {
      const object = definitions[key];
      this.processSchema(object);
    });
  }

  private processSchema(object: JSONSchema): void {
    const props = object.properties;
    const { required } = object;

    this.processAdditionalProperties(object);
    if (object.type === 'array') {
      if (object.items) {
        this.processSchema(object.items);
      }
      return;
    }
    if (!props) {
      return;
    }
    Object.keys(props).forEach((key: string) => {
      if (!props) {
        throw new Error('The schema must have properties.');
      }
      if (key === 'Value'
        && (!required || !required.includes(key))) {
        props[this.charKey] = props[key];
        delete props[key];
      } else {
        this.processSchema(props[key]);
      }
    });
  }

  private processAdditionalProperties(object: JSONSchema): void {
    if (this.isObjectSchema(object)) {
      // eslint-disable-next-line no-param-reassign
      object.additionalProperties = false;
    }
  }

  public static process(schema: JSONSchema, charKey: string = 'charKey'): void {
    const schemaCharKey = new SchemaCharKey(schema, charKey);
    if (!schemaCharKey) { throw new Error('SchemaCharKey occurred an error.'); }
  }

  private isObjectSchema(schema: JSONSchema): boolean {
    if (!schema.type) {
      return false;
    }
    return schema.type === 'object' || !!schema.properties;
  }
}
