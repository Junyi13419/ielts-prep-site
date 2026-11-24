# 雅思备考网 · YASIBEIKAO

免费雅思备考资源导航站 + 学习中心 + 老师入驻平台。纯静态站点，无需后端即可运行。

## 在线演示

- 首页：https://a775025d3fb18ebee.app.workbuddy.host/?sharecode=ZPAPPTY4KA
- 学习中心：https://a775025d3fb18ebee.app.workbuddy.host/learn/index.html?sharecode=ZPAPPTY4KA

## 功能

### 首页
- 四大备考资源导航（my-ielts / awesome-IELTS / IELTS-practice / zeeklog）
- 全站搜索（按 `/` 快速聚焦）、深色模式、星标收藏、每日一词
- 使用路线图、横向对比表

### 学习中心 `learn/`
- 每日打卡（连续天数、14 天热力图）
- 间隔重复单词卡（376 张雅思 538 同义替换考点词，SM-2 算法）
- 模考计时与估分（阅读 / 听力模拟题）

### 服务与老师入驻
- `service/` 服务转化页
- `teacher/` 老师入驻中心（注册登录、资质上传、10% 平台维护费规则、收益计算器）

### PWA
- 支持添加到手机主屏幕、离线访问（manifest.json + sw.js）

## 技术栈

纯 HTML / CSS / JavaScript，无构建步骤。直接打开 `index.html` 或用任意静态服务器托管即可。

## 目录结构

```
index.html          首页
style.css / script.js / words.js   样式、交互、词库
learn/              学习中心（打卡 / 单词卡 / 模考）
service/            服务详情页
teacher/            老师入驻中心
awesome/            资源清单页
practice/           my-ielts 练习站（第三方，见下）
practice-atlas/     IELTS-practice 刷题系统（第三方，见下）
```

## 第三方资源说明

本站内置的以下两个目录来自公开 GitHub 仓库，版权归各自作者所有，**请遵守其授权条款**：

- `practice/` — 源自 [hefengxian/my-ielts](https://github.com/hefengxian/my-ielts)，原仓库声明禁止商业用途。
- `practice-atlas/` — 源自 [sallowayma-git/IELTS-practice](https://github.com/sallowayma-git/IELTS-practice)，GPL-3.0 协议，作者声明仅授权特定渠道分发、反对二次分发与牟利。

`zeeklog/IELTS` 资源未落地，仅外链至其官方在线站。

## 词库来源

`words.js` 与 `learn/words.js` 中的卡片提取自 my-ielts 项目的阅读 538 同义替换词库。

## 免责声明

本项目为学习交流用途的资源整理，不构成任何商业用途。第三方内容版权归原作者所有。
