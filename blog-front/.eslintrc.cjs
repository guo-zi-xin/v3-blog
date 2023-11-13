module.exports = {
  root:true,
  env: {
    browser:true,
    es2020: true,
  },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:import/typescript' // 增加对typescript的支持
    ],
    ignorePatterns: ['node_modules/*', 'build/*', 'dist/*', '!.prettierrc.js', '!.cz-config.js', '!.eslintrc.cjs'],
    parser: 'vue-eslint-parser', // 解析器
    parserOptions: { // 解析器选项
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
          jsx: true
      }
  },
    rules: {
      '@typescript-eslint/ban-ts-ignore': 'off', // 关闭ts-ignore的提示
      '@typescript-eslint/explicit-function-return-type': 'off', // 关闭函数返回类型提示
      '@typescript-eslint/no-explicit-any': 'off', // 关闭any类型提示
      '@typescript-eslint/no-var-requires': 'off', //  关闭require的提示
      '@typescript-eslint/no-empty-function': 'off', // 关闭空函数的提示
      'vue/custom-event-name-casing': 'off', // 关闭自定义事件的提示
      'no-use-before-define': 'off', // 关闭变量定义前使用的提示
      '@typescript-eslint/no-use-before-define': 'off', // 关闭变量定义前使用的提示
      '@typescript-eslint/ban-ts-comment': 'off', //  关闭ts-comment的提示
      '@typescript-eslint/ban-types': 'off', // 关闭ban-types的提示
      '@typescript-eslint/no-non-null-assertion': 'off', // 关闭非空断言的提示
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 关闭模块导出类型的提示
      '@typescript-eslint/no-unused-vars': [ // 关闭未使用变量的提示
          'error',
          {
              argsIgnorePattern: '^h$',
              varsIgnorePattern: '^h$'
          }
      ],
      'no-unused-vars': [
          'error',
          {
              argsIgnorePattern: '^h$',
              varsIgnorePattern: '^h$'
          }
      ],
      'space-before-function-paren': 'off', // 关闭函数括号前的空格提示
      quotes: ['error', 'single'], // 强制使用单引号
      'comma-dangle': ['error', 'never'], // 不允许末尾逗号
      'no-param-reassign': 0, // 允许参数重新赋值
      'no-debugger': 2, // 禁止出现debugger
      'no-alert': 2, // 禁止使用alert confirm prompt
      'class-methods-use-this': 0, // 关闭类方法中必须使用this
      'import/prefer-default-export': 0, // 关闭模块须有export default
      'no-dupe-keys': 2, // 禁止对象中出现同名key
      'no-dupe-args': 2, // 禁止出现同名参数
      'no-use-before-define': [2, { functions: false }], // 除函数外，必须在应用前声明
      "@typescript-eslint/no-explicit-any": ["off"], // 关闭any类型的警告
    },
    overrides: [
      {
        files: ['*.js', '*.ts', '*.jsx', '*.tsx', '*.vue'], // 针对目标后缀名的文件
        rules: {
          'import/no-default-export': 0, // 关闭默认导出的警告
        },
      },
    ],
} 