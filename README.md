## 小程序-demo

[![Build Status](https://www.travis-ci.org/dewfall123/deduction-service.svg?branch=main)](https://www.travis-ci.org/dewfall123/deduction-service)

扣费服务Demo。

### 如何使用

## 开发

1. 初始化
```
yarn
```
2. 构建npm
在开发工具里面构建npm。

3. 执行命令
```
yarn dev
```

`yarn dev`会先清空`dist`目录。然后并发执行`*.ts`文件的编译 + `*.less`文件的编译 + `*.wxml`,`*.json`文件的复制。并且监听了文件的增加和删除。

```
yarn build
```
和`yarn dev`一样，只是不监听文件变化，用于上传代码之前执行。

## 其他命令

- `yarn ls-lint`: 检查文件命名规范。
- `yarn lint`: `eslint` + `prettier`检查和修复代码。
- `yarn lint-fix`: `yarn-lint`并修复。
- `yarn changelog`: 自动生成changelog。
- `yarn prettier`: 修复代码格式。

## 代码结构

```
|-cloudfunctions 云函数目录
|  |-get-deduction-service
|  |-get-deduction-services
|  |-update-deduction-service
|-dist 打包输出目录
|-scripts node脚本
|-src 源码会把ts less文件打包编译到`dist`目录
|  |-pages
|  |  |-detail
|  |  |-index
|  |-styles
|  |-utils
```
源码全在`src`目录下，运行`yarn dev` 或者 `yarn build`命令会把src目录下文件编译+复制到`dist`。
