import { compileFromFile } from 'json-schema-to-typescript';
import * as fs from 'fs';

const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];

if (!inputFilePath || !outputFilePath) {
  console.error('Please provide input and output file paths.');
  process.exit(1);
}

compileFromFile(inputFilePath)
  .then((ts) => fs.writeFileSync(outputFilePath, ts))
  .then(() => console.log(`Interface file successfully generated: ${outputFilePath}`))
  .catch((err) => console.error('Error generating interface file:', err));
