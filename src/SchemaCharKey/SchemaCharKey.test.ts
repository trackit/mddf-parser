import SchemaCharKey from './SchemaCharKey';

describe('SchemaCharKey', () => {
  describe('process', () => {
    it('should process the schema', () => {
      const schema = {
        definitions: {
          Test: {
            type: 'object',
            properties: {
              ITEM: {
                type: 'object',
                properties: {
                  Value: {
                    type: 'string',
                  },
                },
              },
              Value: {
                type: 'string',
              },
            },
          },
        },
      };
      const schemaCharKey = new SchemaCharKey(schema);
      schemaCharKey.process();
      expect(schema).toEqual({
        definitions: {
          Test: {
            type: 'object',
            additionalProperties: false,
            properties: {
              ITEM: {
                type: 'object',
                additionalProperties: false,
                properties: {
                  charKey: {
                    type: 'string',
                  },
                },
              },
              charKey: {
                type: 'string',
              },
            },
          },
        },
      });
    });

    it('should process the schema with required', () => {
      const schema = {
        definitions: {
          MediaProfiletype: {
            type: 'object',
            required: [
              'Namespace',
              'Profile',
            ],
            properties: {
              Namespace: { type: 'string' },
              Profile: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    Value: { type: 'string' },
                  },
                },
                minItems: 1,
              },
            },
          },
        },
      };
      const schemaCharKey = new SchemaCharKey(schema);
      schemaCharKey.process();
      expect(schema).toEqual({
        definitions: {
          MediaProfiletype: {
            type: 'object',
            additionalProperties: false,
            required: [
              'Namespace',
              'Profile',
            ],
            properties: {
              Namespace: { type: 'string' },
              Profile: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    charKey: { type: 'string' },
                  },
                },
                minItems: 1,
              },
            },
          },
        },
      });
    });
  });
});
