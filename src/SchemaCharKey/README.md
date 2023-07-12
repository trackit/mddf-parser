# SchemaCharKey

It's a TypeScript library that lets you replace 'Value' variables throughout your JsonSchema with a name of your choice. It also lets you set the 'additionalProperties' parameter to false in all objects contained in your JsonSchema.

## Usage

To use the library with NPM, run the following command:

```bash
npm install
npm run schemacharkey -- <Path-to-json-schema> <Path-to-out>
```

To use the library with code, use the following method:

```typescript
// Import the required classes
import * as fs from 'fs';
import SchemaCharKey from './src/SchemaCharKey/SchemaCharKey';
import { JSONSchema } from './src/SchemaUtils/SchemaUtils';

// Get the json schema
const schemaPath = process.argv[2];
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8')) as JSONSchema;

// Process the schema with the SchemaCharKey class
SchemaCharKey.process(schema, 'charKey');
```
