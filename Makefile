install: 
			npm ci

lint:
			npx eslint --fix

json:
			node bin/gendiff.js --format json __fixtures__/file1.json __fixtures__/file2.json

plain:
			node bin/gendiff.js --format plain __fixtures__/file1.json __fixtures__/file2.json

yml:
			node bin/gendiff.js __fixtures__/file1.yml __fixtures__/file2.yml

test:
			npm test

test-coverage:
			npm test -- --coverage --coverageProvider=v8
