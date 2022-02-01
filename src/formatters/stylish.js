import _ from 'lodash';

const getSpace = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const getString = (data, depth, styleField) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const output = Object.entries(data)
    .map(([name, value]) => styleField({ type: 'unchanged', name, value }, depth + 1));

  return `{\n${output.join('\n')}\n${getSpace(depth)}  }`;
};

const styleField = (field, depth = 0) => {
  switch (field.type) {
    case 'root': {
      const output = field.children.flatMap((node) => styleField(node, depth + 1));
      return `{\n${output.join('\n')}\n}`;
    }
    case 'nested': {
      const output = field.children.flatMap((node) => styleField(node, depth + 1));
      return `${getSpace(depth)}  ${field.name}: {\n${output.join('\n')}\n${getSpace(depth)}  }`;
    }
    case 'added':
      return `${getSpace(depth)}+ ${field.name}: ${getString(field.value, depth, styleField)}`;
    case 'removed':
      return `${getSpace(depth)}- ${field.name}: ${getString(field.value, depth, styleField)}`;
    case 'unchanged':
      return `${getSpace(depth)}  ${field.name}: ${getString(field.value, depth, styleField)}`;
    case 'changed': {
      const { name, value1, value2 } = field;
      const data1 = `${getSpace(depth)}- ${name}: ${getString(value1, depth, styleField)}`;
      const data2 = `${getSpace(depth)}+ ${name}: ${getString(value2, depth, styleField)}`;
      return `${data1}\n${data2}`;
    }
    default:
      throw new Error('Error! Unknown type!');
  }
};

export default styleField;
