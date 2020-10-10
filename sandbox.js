const styx = require('./lib/styx');
const {parse} = require('esprima');
const fs = require( 'fs' );

const code = fs.readFileSync( 'input.js', 'utf8' );

const ast = parse(code);
const flowProgram = styx.parse(ast);

function findFlowGraphAndNameForId(flowProgram, functionId) {
    if (!functionId) {
        return [flowProgram.flowGraph, "Main Program"];
    }

    for (let i = 0, length = flowProgram.functions.length; i < length; i++) {
        const fun = flowProgram.functions[i];

        if (fun.id === functionId) {
            return [fun.flowGraph, fun.name];
        }
    }

    throw Error("Couldn't find function with id ".concat(functionId));
}

let dot = null;
try {
    let [flowGraph, name] = findFlowGraphAndNameForId(
        flowProgram,
        1
    );

    dot = styx.exportAsDot(flowGraph, name);
} catch (e) {
    dot = styx.exportAsDot(flowProgram.flowGraph);
}


fs.writeFile('output.gv', dot, 'utf8', () => {});