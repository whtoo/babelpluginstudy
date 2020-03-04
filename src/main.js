import { parse } from "@babel/parser";
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from "@babel/types";

const code = 'function add(n) { return n + n }';
/// parse code  -> ast
const ast = parse(code);

traverse(ast, {
    enter(path) {
        if(path.isIdentifier({name : 'n'})) {
            path.node.name = 'x'
        } else if(path.isBinaryExpression()){
            if(path.node.operator === '+'){
                /// ReplaceWith 就是对当前path做"替换"的方法
                path.replaceWith(t.binaryExpression("*",t.identifier('x'),t.numericLiteral(2)))
            }
        }
    }
})


const output = generate(ast,code)
console.log(output.code)