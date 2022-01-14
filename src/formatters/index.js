import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const formatters = { stylish: makeStylish, plain: makePlain, json: makeJson };
const makeFormattedTree = (differencesTree, format) => formatters[format](differencesTree.children);

export default makeFormattedTree;
