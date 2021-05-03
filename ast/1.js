let esprima = require('esprima'); // 转换
let estraverse = require('estraverse'); // 遍历
let escodegen =  require('escodegen'); // 重新生成代码
let sourceCode = `function ast() {}`;
// esprima 代码转换成语法树
let ast = esprima.parse(sourceCode);

// console.log(ast)
/*
Script {
  type: 'Program',
  body: [
    FunctionDeclaration {
      type: 'FunctionDeclaration',
      id: [Identifier],
      params: [],
      body: [BlockStatement],
      generator: false,
      expression: false,
      async: false
    }
  ],
  sourceType: 'script'
}
*/

/**
 * estraverse
 * 遍历语法树，深度优先
 * 只遍历有type属性的节点
 *  */
let indent = 0;
const pandding = () => " ".repeat(indent);
estraverse.traverse(ast, {
    enter(node) {
        if (node.type === 'FunctionDeclaration') {
            // 函数声明FunctionDeclaration
            // 在遍历的时候，可以进行转换
            node.id.name = 'new' + node.id.name;
        }
        console.log(pandding() + 'enter-' + node.type);
        indent += 2;
    },
    leave(node) {
        indent -= 2;
        console.log(pandding() + 'leave-' + node.type);
    }
})

/**
enter-Program
  enter-FunctionDeclaration
    enter-Identifier
    leave-Identifier
    enter-BlockStatement
    leave-BlockStatement
  leave-FunctionDeclaration
leave-Program
 */

let targetCode = escodegen.generate(ast);

console.log(targetCode)