import SchemaConformer from './SchemaConformer';
import { LocalFileAdaptor } from '../FileAdaptor/LocalFileAdaptor';
import generateRawSimpleStringJSON from '../../assets/RawJSONSamples/simple_string';
import generateSimpleStringJSON from '../../assets/JSONSamples/simple_string';

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
  });
});
