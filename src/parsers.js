import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};
const parse = (stringData, dataType) => {
  const parser = parsers[dataType];
  const data = parser(stringData);
  return data;
};

export default parse;
