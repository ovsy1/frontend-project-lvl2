## Hexlet tests and linter status:
[![Actions Status](https://github.com/ovsy1/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/ovsy1/frontend-project-lvl2/actions)
###
[![Lint](https://github.com/ovsy1/frontend-project-lvl2/actions/workflows/testAndLint.yml/badge.svg)](https://github.com/ovsy1/frontend-project-lvl2/actions/workflows/testAndLint.yml) 
###
[![Maintainability](https://api.codeclimate.com/v1/badges/023370f3d8d2c9eda9f2/maintainability)](https://codeclimate.com/github/ovsy1/frontend-project-lvl2/maintainability)
###
[![Test Coverage](https://api.codeclimate.com/v1/badges/023370f3d8d2c9eda9f2/test_coverage)](https://codeclimate.com/github/ovsy1/frontend-project-lvl2/test_coverage)

### gendiff:
[![asciicast](https://asciinema.org/a/461385.svg)](https://asciinema.org/a/461385)

## About programm:

Compares two configuration files and shows a difference.

### Install:

for install all dependencies:
```sh
make install
```
for install packages:
```sh
npm link
```

### Tests

for to run tests:
```sh
make test
```

## Use of the programm

### Help

For to get help:
```sh
gendiff --help
```
or:
```sh 
gendiff -h
```
Formats supported by the program:
`.json`, `.yml`, `.yaml`

Supported output formats:
`json`, `plain`, `stylish`

### How to use
```sh
gendiff [options] <filepath1> <filepath2>
```

Options:
* -V, --version             output the version number
* -f, --format [type]       output format (choices: "stylish", "plain", "json", default: stylish)
* -h, --help                display help for command

### Example JSON and yml files:
[![asciicast](https://asciinema.org/a/461793.svg)](https://asciinema.org/a/461793)