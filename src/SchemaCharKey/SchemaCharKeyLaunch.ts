import * as fs from 'fs';
import SchemaCharKey from './SchemaCharKey';
import { JSONSchema } from '../SchemaUtils/SchemaUtils';

const schemaPath = process.argv[2];
const outputPath = process.argv[3];

if (!schemaPath) throw new Error('The schema path must be defined.');
if (!outputPath) throw new Error('The output path must be defined.');

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8')) as JSONSchema;
SchemaCharKey.process(schema, 'charKey');

fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2));
