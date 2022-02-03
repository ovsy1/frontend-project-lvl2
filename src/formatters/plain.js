import _ from 'lodash';

const getString = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (_.isString(data)) {
    return `'${data}'`;
  }
  return String(data);
};

const plain = (data, pathKeys = []) => {
  const fieldKeys = [...pathKeys, data.name];
  const fieldName = fieldKeys.join('.');
  switch (data.type) {
    case 'root': {
      const output = data.children.filter((node) => node.type !== 'unchanged').map((node) => plain(node));
      return output.join('\n');
    }
    case 'nested': {
      const output = data.children.filter((node) => node.type !== 'unchanged').map((node) => plain(node, fieldKeys));
      return output.join('\n');
    }
    case 'added':
      return `Property '${fieldName}' was added with value: ${getString(data.value)}`;
    case 'removed':
      return `Property '${fieldName}' was removed`;
    case 'changed': {
      const { value1, value2 } = data;
      return `Property '${fieldName}' was updated. From ${getString(value1)} to ${getString(value2)}`;
    }
    case 'unchanged':
      return null;
    default:
      throw new Error('Error! Unknown type!');
  }
};

export default plain;
