import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getExpected = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['file1.json', 'file2.json', 'stylish', 'expected.stylish.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'expected.stylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'expected.plain.txt'],
  ['file1.json', 'file2.json', 'json', 'expected.json.txt'],
];

test.each(cases)('test %s and %s in %s format', (firstFile, secondFile, format, expectedFile) => {
  const file1Path = getFixturePath(firstFile);
  const file2Path = getFixturePath(secondFile);
  const expectedFileData = getExpected(expectedFile);
  const result = genDiff(file1Path, file2Path, format);
  expect(result).toEqual(expectedFileData);
});
