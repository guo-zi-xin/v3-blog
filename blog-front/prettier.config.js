module.exports = {
  semi: true, //强制在语句末尾使用分号。
  trailingComma: 'none', //不允许在多行结构的最后一个元素或属性后添加逗号。
  singleQuote: true, //使用单引号而不是双引号来定义字符串。
  printWidth: 120, //指定每行代码的最大字符宽度，超过这个宽度的代码将被换行
  tabWidth: 4, //指定一个制表符（Tab）等于多少个空格。
  bracketSpacing: true, //在对象字面量声明所使用的的花括号后（{）和前（}）输出空格。
  trailingComma: 'none', //不允许在多行结构的最后一个元素或属性后添加逗号。

  printWidth: 100, // 每行代码长度（默认80）
  tabWidth: 4, // 每个tab相当于多少个空格（默认2）
  useTabs: false, // 是否使用tab进行缩进（默认false）
  semi: true, // 声明结尾使用分号(默认true)
  vueIndentScriptAndStyle: true, // script和style标签缩进
  singleQuote: true, // 单引号
  quoteProps: 'as-needed', // 对象属性的引号使用
  bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  trailingComma: 'none', // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  arrowParens: 'always', // 箭头函数参数括号，默认always，效果：(x) => x
  insertPragma: false, // 是否插入Pragma标记，与prettier标记有关
  requirePragma: false, // 是否要求有Pragma标记，与prettier标记有关
  proseWrap: 'never', // 是否换行，默认为preserve，效果：（true|false|preserve）
  htmlWhitespaceSensitivity: 'strict', // 指定HTML文件的全局空白区域敏感度
  endOfLine: 'auto' // 结尾是 \n \r \n\r auto
};