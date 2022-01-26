import _ from 'lodash';
import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const formatters = {
  stylish: makeStylish,
  plain: makePlain,
  json: makeJson,
};

const format = (innerTree, ontputFormat) => {
  if (!_.has(formatters, ontputFormat)) {
    throw new Error(`Format: ${ontputFormat} is not supported. Use "plain", "json" or "stylish"`);
  }
  return formatters[ontputFormat](innerTree);
};

export default format;
