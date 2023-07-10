import { JSONSchema } from '../SchemaUtils/SchemaUtils';

export default class SchemaCharKey {
  private charKey: string = 'charKey';

  constructor(private readonly schema: JSONSchema) {
    this.schema = schema;
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
        || (required && !required.includes(key))) {
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

  public process(): void {
    let object;

    if (!this.schema) { throw new Error('The schema must be defined.'); }
    const { definitions } = this.schema;
    if (!definitions) { throw new Error('The schema must have definitions.'); }
    Object.keys(definitions).forEach((key: string) => {
      if (!definitions) { throw new Error('The schema must have definitions.'); }
      object = definitions[key];
      if (!object) { throw new Error('The schema cant be undefined.'); }
      this.processSchema(object);
      this.processAdditionalProperties(object);
    });
  }

  private isObjectSchema(schema: JSONSchema): boolean {
    if (!schema) { throw new Error('The schema must be defined.'); }
    if (!schema.type) { throw new Error('The schema must have type.'); }
    return schema.type === 'object' || !!schema.properties;
  }
}
