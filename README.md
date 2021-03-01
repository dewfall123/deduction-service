## 小程序

[![Build Status](https://www.travis-ci.org/dewfall123/deduction-service.svg?branch=main)](https://www.travis-ci.org/dewfall123/deduction-service)

扣费服务小程序 Demo。包含列表查看，项目详情两个页面。

### 如何使用

## 开发

1. 初始化

```
yarn
```

2. 构建 npm 在小程序开发工具里面构建 npm。

3. 执行命令

```
yarn dev
```

`yarn dev`会编译 ts 文件和 less 文件，复制其它相关文件到 dist 目录。并且监听了文件的变动。

## 代码结构

### 主要目录说明

```
|-.husky           husky自动生成的钩子
|-cloudfunctions   serverless云函数目录
|  |-...
|-dist             打包输出目录
|-scripts          node脚本
|-src              业务源码，会打包编译到`dist`目录
|  |-assets
|  |-components
|  |-pages
|  |  |-detail
|  |  |-index
|  |-styles
|  |-...
|-test             automator自动化测试脚本
```

## 工程化

### 1. Ts less 编译

见[scripts\build.js](scripts\build.js)。

本项目使用 typescript,less 开发，小程序只能支持 js(es6 部分特性)，wxss（同 css 语法）需要编译。

编译命令 `yarn dev` 或 `yarn build`（build 命令不会监听文件变化）。

### 2. lint 相关

| 命令          | 说明                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------ |
| yarn ls-lint  | 检查文件命名规范，约定文件命名需要满足`kebab-case`规范。详细配置见根目录`.ls-lint.yml`配置文件。 |
| yarn lint     | eslint + prettier 检查。详细配置见根目录`.eslintrc.js`，`.prettierrc`配置文件。                  |
| yarn lint-fix | 同上，会修改文件                                                                                 |
| yarn prettier | prettier 修改文件格式                                                                            |

### 3. 测试

见[test\index.spec.js](test\index.spec.js)。

命令`yarn test`。

使用`miniprogram-automator`做了简单的自动化测试。
需要通过增加`automator.js`文件设置。

```js
// automator.js 示例
module.exports = {
  cliPath: '/path/cli.bat',
  projectPath: 'path/to/project',
};
```

### 4. git 相关

通过`husky` + `lint-stage` + `commitlint`设置两个钩子。

1. 通过 eslint prettier 检查代码。
2. 检查 commit msg 格式。

### 5. travis-ci

在[.travis.yml](.travis.yml)文件配置 ci 对代码进行检查。
还没找到合适的 ci 部署方法。

## 后台

用小程序云开发的云函数+数据库实现了一个**简易**的后台接口。

为了方便演示，省略根据用户 ID 筛选，所以每个人返回列表相同。

演示数据库已导出在[database.json](database.json).

## 体验版
<p>
  <img src="qr.jpg" width="150" />
</p>