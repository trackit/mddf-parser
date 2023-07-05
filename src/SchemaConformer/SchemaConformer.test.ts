import SchemaConformer from './SchemaConformer';
import { LocalFileAdaptor } from '../FileAdaptor/LocalFileAdaptor';
import generateRawSimpleStringJSON from '../../assets/RawJSONSamples/simple_string';
import generateSimpleStringJSON from '../../assets/JSONSamples/simple_string';
import generateSingleElementArrayJSON from '../../assets/JSONSamples/simple_array_single_element';
import generateSingleElementArrayRawJSON from '../../assets/RawJSONSamples/simple_array_single_element';
import generateObjectElementArrayRawJSON from '../../assets/RawJSONSamples/object_array_single_element';
import generateObjectElementArrayJSON from '../../assets/JSONSamples/object_array_single_element';

describe('SchemaConformer', () => {
  const getSchema = async (path: string): Promise<object> => {
    const fileReader = new LocalFileAdaptor();
    return JSON.parse(await fileReader.readFile(path));
  };

  const charKey = 'Value';

  describe('conform', () => {
    it('should conform the object to the schema', async () => {
      const rawObject = generateRawSimpleStringJSON(charKey);
      const expectedObject = generateSimpleStringJSON();

      const schema = await getSchema('assets/JSONSchemaSamples/simple_string.json');

      const conformer = new SchemaConformer(schema);

      conformer.conform(rawObject);

      expect(rawObject).toEqual(expectedObject);
    });

    it('should conform the object to the schema with a single element array', async () => {
      const rawObject = generateSingleElementArrayRawJSON(charKey);
      const expectedObject = generateSingleElementArrayJSON();

      const schema = await getSchema('assets/JSONSchemaSamples/simple_array.json');

      const conformer = new SchemaConformer(schema);

      conformer.conform(rawObject);

      expect(rawObject).toEqual(expectedObject);
    });

    it('should conform the object to the schema with a object element array', async () => {
      const rawObject = generateObjectElementArrayRawJSON(charKey);
      const expectedObject = generateObjectElementArrayJSON();

      const schema = await getSchema('assets/JSONSchemaSamples/object_array_single_element.json');

      const conformer = new SchemaConformer(schema);

      conformer.conform(rawObject);

      expect(rawObject).toEqual(expectedObject);
    });
  });
});
