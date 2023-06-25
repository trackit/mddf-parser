export default class SchemaConformer {
  constructor(private schema: object) {
    this.schema = schema;
  }

  conform(rawObject: object): object {
    throw new Error('Method not implemented.');
  }

  getSchema(): object {
    return this.schema;
  }
}
