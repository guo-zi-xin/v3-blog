'use strict';

module.exports = {
  // git 提交类型配置
  types: [
    { value: 'feat', name: 'feat: 新增功能' },
    { value: 'bug', name: 'bug: 测试反馈bug列表中的bug号' },
    { value: 'fix', name: 'fix: 修复bug' },
    { value: 'ui', name: 'ui: 更新UI' },
    { value: 'docs', name: 'docs: 文档变更' },
    { value: 'style', name: 'style: 代码格式(不影响代码运行的变动)' },
    { value: 'perf', name: 'perf: 性能优化' },
    { value: 'refactor', name: 'refactor: 重构(既不是增加feature，也不是修复bug)' },
    { value: 'release', name: 'release: 发布' },
    { value: 'deploy', name: 'deploy: 部署' },
    { value: 'test', name: 'test: 增加测试' },
    { value: 'chore', name: 'chore: 构建过程或辅助工具的变动(更改配置文件)' },
    { value: 'revert', name: 'revert: 撤销提交' },
    { value: 'build', name: 'build: 打包' }
  ],
  // 交互提示信息
  messages: {
    type: '请选择提交的类型:',
    customScope: '请输入本次提交的范围(可选):',
    subject: '请简要描述本次提交的内容(必填):',
    body: '请输入详细描述(可选，待优化为自动换行):',
    footer: '请输入要关闭的issue(可选，例如: #31, #34):',
    confirmCommit: '确认提交?'
  },
  allowCustomScopes: true, // 是否允许自定义scope
  skipquestions: ['body', 'footer'], // 跳过选项
  subjectLimit: 100 // 限制主题长度
}