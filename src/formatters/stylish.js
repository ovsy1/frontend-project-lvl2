import _ from 'lodash';

const getSpace = (count) => ('    '.repeat(count));

const getString = (value, count) => {
  const offset = getSpace(count);
  const childrenOffset = getSpace(count + 1);
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.keys(value);
  const renderedStrings = keys.map((key) => `${childrenOffset}    ${[key]}: ${getString(value[key], count + 1)}`);
  return `{\n${renderedStrings.join('\n')}\n${offset}    }`;
};

const diffsToString = (diffs, depth = 0) => {
  const diffToString = (diff, count) => {
    const {
      name,
      type,
      value,
      value1,
      value2,
      children,
    } = diff;
    const offset = getSpace(count);

    switch (type) {
      case 'nested':
        return `${offset}    ${name}: {\n${diffsToString(children, count + 1)}\n${offset}    }`;
      case 'unchanged':
        return `${offset}    ${name}: ${getString(value, count)}`;
      case 'changed':
        return `${offset}  - ${name}: ${getString(value1, count)}\n${offset}  + ${name}: ${getString(value2, count)}`;
      case 'removed':
        return `${offset}  - ${name}: ${getString(value, count)}`;
      case 'added':
        return `${offset}  + ${name}: ${getString(value, count)}`;
      default:
        throw new Error(`Unknown type of difference: '${type}'!`);
    }
  };

  return `${diffs.map((diff) => diffToString(diff, depth)).join('\n')}`;
};

const makeStylish = (diffs) => {
  if (diffs.length !== 0) return `{\n${diffsToString(diffs)}\n}`;
  return '';
};

export default makeStylish;
