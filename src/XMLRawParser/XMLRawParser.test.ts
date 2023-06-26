import { XMLRawParser } from './XMLRawParser';
import { LocalFileAdaptor } from '../FileAdaptor/LocalFileAdaptor';
import generateBooleanAttributeJSON from '../../assets/JSONSamples/boolean_attribute';
import generateBooleanTagJSON from '../../assets/JSONSamples/boolean_tag';
import generateElementsArrayWithDifferentTagsJSON from '../../assets/JSONSamples/elements_array_with_different_tags';
import generateManyAttributeOnSameTagJSON from '../../assets/JSONSamples/many_attribute_on_same_tag';
import generateOptionalAttributeJSON from '../../assets/JSONSamples/optional_attribute';
import generateDifferentArrayLengthJSON from '../../assets/JSONSamples/same_array_with_different_lenght';
import generateManyElementsArrayJSON from '../../assets/JSONSamples/many_elements_array';
import generateRawSimpleStringJSON from '../../assets/RawJSONSamples/simple_string';
import generateSingleElementArrayRawJSON from '../../assets/RawJSONSamples/simple_array_single_element';
import generateLibrary from '../../assets/RawJSONSamples/library';

const testsData = [
  { generateJSON: generateBooleanAttributeJSON, fileName: 'boolean_attribute.xml' },
  { generateJSON: generateBooleanTagJSON, fileName: 'boolean_tag.xml' },
  { generateJSON: generateElementsArrayWithDifferentTagsJSON, fileName: 'elements_array_with_different_tags.xml' },
  { generateJSON: generateManyAttributeOnSameTagJSON, fileName: 'many_attribute_on_same_tag.xml' },
  { generateJSON: generateOptionalAttributeJSON, fileName: 'optional_attribute.xml' },
  { generateJSON: generateDifferentArrayLengthJSON, fileName: 'same_array_with_different_lenght.xml' },
  { generateJSON: generateSingleElementArrayRawJSON, fileName: 'single_element_array.xml' },
  { generateJSON: generateManyElementsArrayJSON, fileName: 'many_elements_array.xml' },
  { generateJSON: generateRawSimpleStringJSON, fileName: 'simple_string.xml' },
  { generateJSON: generateLibrary, fileName: 'library.xml' },
];

describe('XMLRawParser', () => {
  let parser: XMLRawParser;
  const xmlFileAdaptor = new LocalFileAdaptor();

  beforeEach(() => {
    parser = new XMLRawParser();
  });

  describe('parseString', () => {
    testsData.forEach((testData) => {
      it(`should parse ${testData.fileName} and return the parsed object`, async () => {
        const xmlData = await xmlFileAdaptor.readFile(`assets/XMLsamples/${testData.fileName}`);
        const expectedObject = testData.generateJSON('Value');
        const parsedObject = await parser.parseString(xmlData);

        expect(parsedObject).toEqual(expectedObject);
      });
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
  });
});
