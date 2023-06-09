import { XMLRawParser } from './XMLRawParser';
import { LocalXMLFileAdaptor } from './adaptors/secondary/LocalXMLFileAdaptor';
import generateBooleanAttributeJSON from '../assets/JSONSamples/boolean_attribute';
import generateBooleanTagJSON from '../assets/JSONSamples/boolean_tag';
import generateElementsArrayWithDifferentTagsJSON from '../assets/JSONSamples/elements_array_with_different_tags';
import generateManyAttributeOnSameTagJSON from '../assets/JSONSamples/many_attribute_on_same_tag';
import generateOptionalAttributeJSON from '../assets/JSONSamples/optional_attribute';
import generateDifferentArrayLenghtJSON from '../assets/JSONSamples/same_array_with_different_lenght';
import generateSingleElementArrayJSON from '../assets/JSONSamples/single_element_array';
import generateManyElementsArrayJSON from '../assets/JSONSamples/many_elements_array';
import generateSimpleStringJSON from '../assets/JSONSamples/simple_string';

describe('XMLRawParser', () => {
  let parser: XMLRawParser;
  const xmlFileAdaptor = new LocalXMLFileAdaptor();

  beforeEach(() => {
    parser = new XMLRawParser();
  });

  describe('parseString', () => {
    it('should parse XML string and return the parsed object', async () => {
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

    it('should parse boolean_attribute.xml and return the parsed object', async () => {
      const xmlData = await xmlFileAdaptor.readFile('assets/XMLsamples/boolean_attribute.xml');
      const expectedObject = generateBooleanAttributeJSON('Value');
      const parsedObject = await parser.parseString(xmlData);

      expect(parsedObject).toEqual(expectedObject);
    });

    it('should parse boolean_tag.xml and return the parsed object', async () => {
      const xmlData = await xmlFileAdaptor.readFile('assets/XMLsamples/boolean_tag.xml');
      const expectedObject = generateBooleanTagJSON('Value');
      const parsedObject = await parser.parseString(xmlData);

      expect(parsedObject).toEqual(expectedObject);
    });

    it('should parse elements_array_with_different_tags.xml and return the parsed object', async () => {
      const xmlData = await xmlFileAdaptor.readFile('assets/XMLsamples/elements_array_with_different_tags.xml');
      const expectedObject = generateElementsArrayWithDifferentTagsJSON('Value');
      const parsedObject = await parser.parseString(xmlData);

      expect(parsedObject).toEqual(expectedObject);
    });

    it('should parse many_attribute_on_same_tag.xml and return the parsed object', async () => {
      const xmlData = await xmlFileAdaptor.readFile('assets/XMLsamples/many_attribute_on_same_tag.xml');
      const expectedObject = generateManyAttributeOnSameTagJSON();
      const parsedObject = await parser.parseString(xmlData);

      expect(parsedObject).toEqual(expectedObject);
    });

    it('should parse optional_attribute.xml and return the parsed object', async () => {
      const xmlData = await xmlFileAdaptor.readFile('assets/XMLsamples/optional_attribute.xml');
      const expectedObject = generateOptionalAttributeJSON();
      const parsedObject = await parser.parseString(xmlData);

      expect(parsedObject).toEqual(expectedObject);
    });

    it('should parse same_array_with_different_lenght.xml and return the parsed object', async () => {
      const xmlData = await xmlFileAdaptor.readFile('assets/XMLsamples/same_array_with_different_lenght.xml');
      const expectedObject = generateDifferentArrayLenghtJSON('Value');
      const parsedObject = await parser.parseString(xmlData);

      expect(parsedObject).toEqual(expectedObject);
    });

    it('should parse single_element_array.xml and return the parsed object', async () => {
      const xmlData = await xmlFileAdaptor.readFile('assets/XMLsamples/single_element_array.xml');
      const expectedObject = generateSingleElementArrayJSON('Value');
      const parsedObject = await parser.parseString(xmlData);

      expect(parsedObject).toEqual(expectedObject);
    });
  });
});
