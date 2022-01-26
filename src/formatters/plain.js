import _ from 'lodash';

const getString = (value) => {
  if (value === null) {
    return value;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (diffs, keys = []) => {
  const formatNodes = (diff, previousNames) => {
    const {
      name,
      type,
      value,
      value1,
      value2,
      children,
    } = diff;
    const newKeys = [...previousNames, name];
    switch (type) {
      case 'nested':
        return plain(children, newKeys);
      case 'removed':
        return `Property '${newKeys.join('.')}' was removed`;
      case 'added':
        return `Property '${newKeys.join('.')}' was added with value: ${getString(value)}`;
      case 'changed':
        return `Property '${newKeys.join('.')}' was updated. From ${getString(value1)} to ${getString(value2)}`;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Element type ${type} is not supported!`);
    }
  };
  return diffs
    .map((diff) => formatNodes(diff, keys))
    .filter((str) => str !== null)
    .join('\n');
};

export default plain;
