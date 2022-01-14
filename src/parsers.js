import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};
const parse = (content, extension) => parsers[extension](content);

export default parse;
