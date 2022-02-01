import _ from 'lodash';

const compareObjects = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        name: key,
        children: compareObjects(data1[key], data2[key]),
        type: 'nested',
      };
    }
    if (!_.has(data1, key)) {
      return {
        name: key,
        type: 'added',
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        name: key,
        type: 'removed',
        value: data1[key],
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        name: key,
        type: 'changed',
        value1: data1[key],
        value2: data2[key],
      };
    }
    return {
      name: key,
      type: 'unchanged',
      value: data1[key],
    };
  });
};

const buildTree = (object1, object2) => ({
  type: 'root',
  children: compareObjects(object1, object2),
});

export default buildTree;
