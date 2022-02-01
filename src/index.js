import _ from 'lodash';
import * as fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './differencesTreeMaker.js';
import format from './formatters/index.js';

const getFileData = (filepath) => {
  const absolutePath = path.isAbsolute(filepath) ? filepath : path.resolve(process.cwd(), filepath);
  const file = fs.readFileSync(absolutePath, 'utf-8');
  const extname = _.last(absolutePath.split('.'));
  return [file, extname];
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const [fileData1, fileType1] = getFileData(filepath1);
  const object1 = parse(fileData1, fileType1);
  const [fileData2, fileType2] = getFileData(filepath2);
  const object2 = parse(fileData2, fileType2);
  return format(buildTree(object1, object2), formatName);
};
export default genDiff;
