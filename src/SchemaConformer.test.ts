import Ajv, { JSONSchemaType } from 'ajv';
import { LocalXMLFileAdaptor } from './adaptors/secondary/LocalXMLFileAdaptor';
import { SchemaConformer } from './SchemaConformer';

// import the JSON generation functions
import generateBooleanAttributeJSON from '../assets/JSONSamples/boolean_attribute';
import generateBooleanTagJSON from '../assets/JSONSamples/boolean_tag';
import generateElementsArrayWithDifferentTagsJSON from '../assets/JSONSamples/elements_array_with_different_tags';
import generateManyAttributeOnSameTagJSON from '../assets/JSONSamples/many_attribute_on_same_tag';
import generateOptionalAttributeJSON from '../assets/JSONSamples/optional_attribute';
import generateDifferentArrayLengthJSON from '../assets/JSONSamples/same_array_with_different_lenght';
import generateSingleElementArrayJSON from '../assets/JSONSamples/single_element_array';
import generateManyElementsArrayJSON from '../assets/JSONSamples/many_elements_array';
import generateSimpleStringJSON from '../assets/JSONSamples/simple_string';

describe('Object validation against JSON Schema', () => {
  const fileAdaptor = new LocalXMLFileAdaptor();

  const tests = [
    { name: 'boolean_attribute_json', test: generateBooleanAttributeJSON('Value') },
    { name: 'boolean_tag_json', test: generateBooleanTagJSON('Value') },
    { name: 'elements_array_with_different_tags_json', test: generateElementsArrayWithDifferentTagsJSON('Value') },
    { name: 'many_attribute_on_same_tag_json', test: generateManyAttributeOnSameTagJSON() },
    { name: 'optional_attribute_json', test: generateOptionalAttributeJSON() },
    { name: 'different_array_length_json', test: generateDifferentArrayLengthJSON('Value') },
    { name: 'single_element_array_json', test: generateSingleElementArrayJSON('Value') },
    { name: 'many_elements_array_json', test: generateManyElementsArrayJSON('Value') },
    { name: 'simple_string_json', test: generateSimpleStringJSON('Value') },
  ];

  tests.map(({ name, test }) => it(`should validate the object against the schema for ${name}`, async () => {
    const schema: JSONSchemaType<any> = JSON.parse(
      await fileAdaptor.readFile('assets/JSONSchemaSamples/global_json_schema_for_tests.json'),
    ) as JSONSchemaType<any>;
    const schemaConformer = new SchemaConformer(schema);
    const rawObject = test;
    const obj = schemaConformer.conform(rawObject);

    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    const valid = validate(obj);

    if (!valid) {
      console.log(validate.errors);
    }

    expect(valid).toBe(true);
  }));
});
