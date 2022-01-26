import * as fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './differencesTreeMaker.js';
import makeFormattedTree from './formatters/index.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);
const getParsedData = (filename) => {
  const filepath = getPath(filename);
  const extension = path.extname(filepath).slice(1);
  return parse(fs.readFileSync(filepath, 'utf-8'), extension);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const dataFromFile1 = getParsedData(filepath1);
  const dataFromFile2 = getParsedData(filepath2);
  const differencesTree = buildTree(dataFromFile1, dataFromFile2);
  return makeFormattedTree(differencesTree, format);
};
export default genDiff;
