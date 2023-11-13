module.exports = {
  extends: ['@commitlint/config-conventional', 'cz'], // 继承配置
  rules: {
    'type-enum': [ // 提交类型配置
      2, // 代表必须输入
      'always', // 以数组形式定义提交类型
      [
        'feature', // 新功能
        'bug', // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
        'fix', // 修复bug
        'ui', // 更新UI
        'docs', // 文档变更
        'style', // 代码格式(不影响代码运行的变动)
        'perf', // 性能优化
        'release', // 发布
        'deploy', // 部署
        'refactor', // 重构(既不是增加feature，也不是修复bug)
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动(更改配置文件)
        'revert', // 撤销提交
        'build', // 打包
        'merge', // 合并分支
      ]
    ],
    // <type> 格式 小写
    'type-case': [2, 'always', 'lower-case'],
    // <type> 不能为空
    'type-empty': [2, 'never'],
    // <scope> 范围不能为空
    'scope-empty': [2, 'never'],
    // <scope> 范围格式
    'scope-case': [0],
    // <subject> 主要 message 不能为空
    'subject-empty': [2, 'never'],
    // <subject> 以什么为结束标志，禁用
    'subject-full-stop': [0, 'never'],
    // <subject> 格式，禁用
    'subject-case': [0, 'never'],
    // <body> 以空行开头
    'body-leading-blank': [1, 'always'],
    'header-max-length': [0, 'always', 72]
  },
}