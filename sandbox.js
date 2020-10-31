const esgraph = require('./lib');
const {parse} = require('esprima');
const fs = require('fs');

const source = fs.readFileSync('input.js', 'utf8');

const ast = parse(source, { range: true });

fs.writeFile('ast.json', JSON.stringify(ast, null, 2), 'utf8', () => {});

const cfg = esgraph(ast);
const dot = esgraph.dot(cfg, { counter: 0, source });

fs.writeFile('output.gv', dot, 'utf8', () => {});
