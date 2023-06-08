import { XMLRawParser } from './XMLRawParser';
import { LocalXMLFileAdaptor } from './adaptors/secondary/LocalXMLFileAdaptor';
import generateSimpleStringJSON from '../assets/JSONSamples/simple_string';
import generateManyElementsArrayJSON from '../assets/JSONSamples/many_elements_array';

describe('XMLRawParser', () => {
  let parser: XMLRawParser;
  const xmlFileAdaptor = new LocalXMLFileAdaptor();

  beforeEach(() => {
    parser = new XMLRawParser();
  });

  describe('parseString', () => {
    it('should parse XML string and return the parsed object', async () => {
      // const xmlData = '<root><name>John Doe</name><age>30</age></root>';
      const xmlData = await xmlFileAdaptor.readFile('assets/XMLsamples/simple_string.xml');
      const expectedObject = generateSimpleStringJSON('Value');

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
      const xmlData = await xmlFileAdaptor.readFile('assets/XMLsamples/string_with_error.xml');

      await expect(parser.parseString(xmlData)).rejects.toThrow();
    });

    it('should parse XML string with multiple items and return the parsed object', async () => {
      const xmlData = await xmlFileAdaptor.readFile('assets/XMLsamples/many_elements_array.xml');

      const expectedObject = generateManyElementsArrayJSON('Value');

      const parsedObject = await parser.parseString(xmlData);

      expect(parsedObject).toEqual(expectedObject);
    });
  });
});
