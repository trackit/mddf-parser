import generateSingleElementArrayRawJSON from '../../assets/RawJSONSamples/simple_array_single_element';
import generateSingleElementArrayJSON from '../../assets/JSONSamples/simple_array_single_element';
import SchemaConformer from './SchemaConformer';
import { LocalFileAdaptor } from '../FileAdaptor/LocalFileAdaptor';

describe('SchemaConformer', () => {
  const charKey = 'Value';

  const rawObject = generateSingleElementArrayRawJSON(charKey);
  const expectedObject = generateSingleElementArrayJSON(charKey);

  it('should conform the object to the schema', async () => {
    const fileReader = new LocalFileAdaptor();
    const schema = JSON.parse(await fileReader.readFile('assets/JSONSchemaSamples/simple_array.json'));

    const conformer = new SchemaConformer(schema);

    console.log(JSON.stringify(conformer.getSchema(), null, 2));

    expect(conformer.conform(rawObject)).toEqual(expectedObject);
  });
});
