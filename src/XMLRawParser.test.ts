import { XMLRawParser } from './XMLRawParser';

describe('XMLRawParser', () => {
  let parser: XMLRawParser;

  beforeEach(() => {
    parser = new XMLRawParser();
  });

  describe('parseString', () => {
    it('should parse XML string and return the parsed object', async () => {
      const xmlData = '<root><name>John Doe</name><age>30</age></root>';
      const expectedObject = {
        root: {
          name: 'John Doe',
          age: '30',
        },
      };

      const parsedObject = await parser.parseString(xmlData);

      expect(parsedObject).toEqual(expectedObject);
    });

    it('should handle empty XML string and return null', async () => {
      const xmlData = '';
      const expectedObject = null;

      const parsedObject = await parser.parseString(xmlData);

      expect(parsedObject).toEqual(expectedObject);
    });

    it('should handle invalid XML string and throw an error', async () => {
      const xmlData = '<root><name>John Doe</name>'; // Missing closing tag

      await expect(parser.parseString(xmlData)).rejects.toThrow();
    });
  });
});
