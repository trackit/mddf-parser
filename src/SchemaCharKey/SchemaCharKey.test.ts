import SchemaCharKey from "./SchemaCharKey";

describe('SchemaCharKey', () => {
  describe('process', () => {
    it('should process the schema', () => {
      const schema = {
        "definitions": {
          "Test": {
            "type": "object",
            "properties": {
              "ITEM": {
                "type": "object",
                "properties": {
                  "Value": {
                    "type": "string"
                  }
                }
              },
              "Value": {
                "type": "string"
              }
            }
          }
        }
      };
      const schemaCharKey = new SchemaCharKey(schema);
      schemaCharKey.process();
      expect(schema).toEqual({
        "definitions": {
          "Test": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "ITEM": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "charKey": {
                    "type": "string"
                  }
                }
              },
              "charKey": {
                "type": "string"
              }
            }
          }
        }
      });
    });
  });
});