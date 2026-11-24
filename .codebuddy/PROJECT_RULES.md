# 雅思备考网项目 · 协作约定

## 收尾必须执行（用户明确要求，2026-11-25）

**每完成一个任务后，必须同时完成以下两步，才算交付完成：**

1. **同步线上**：在项目根目录执行静态站发布
   ```bash
   node /root/.codebuddy/skills/sites/scripts/publish.js --dir /workspace --language static
   ```
   返回 `verified: true` 即成功。公网地址：
   `https://a775025d3fb18ebee.app.workbuddy.host/?sharecode=ZPAPPTY4KA`

2. **同步 GitHub**：推送到 `Junyi13419/ielts-prep-site`（master 分支）
   - 连接器 App token 无写权限，**必须用用户提供的 PAT**（`ghp_` 开头，有 repo 权限）。
   - PAT 通常为一次性提供；用完即删除临时凭证文件，remote 改回不含令牌的 URL。
   - `git push` 通道不稳定，常报 `Connection reset by peer`。**优先用 GitHub Contents API 逐文件 PUT 更新**（稳定，约 0.6s），再 `git fetch` + `git reset --hard origin/master` 对齐历史。
   - 核验标准：本地与远端 HEAD 一致、`git rev-list --left-right --count origin/master...HEAD` 为 `0 0`、改动文件 SHA 一致、工作区干净。
   - 若用户当下未提供 PAT，先完成本地 commit + 线上发布，并明确告知 GitHub 待同步（记录落后几个提交），等用户提供 PAT 后立即补推。

## 项目要点

- 纯静态站，无构建步骤。主入口 `index.html`；子页 `learn/`（学习中心）、`service/`（服务页）、`teacher/`（老师入驻）、`awesome/`（资源清单）、`practice/`（my-ielts 练习站）、`practice-atlas/`（IELTS Atlas 刷题系统）。
- 深色模式用 CSS 变量 `html[data-theme="dark"]`；注意 `.navbar` 等全宽容器也要覆盖，避免两端露浅色。
- 微信解锁用 `localStorage 'ielts_site_unlocked'`；二维码图 `wechat-qr.png`。
- 小红书主页链接（用户本人）：`https://www.xiaohongshu.com/user/profile/662371840000000003030326`，出现在主站导航栏按钮与 `practice-atlas/index.html` 的 hero 按钮两处。
- 第三方资源：`practice/` 源自 my-ielts（禁商用），`practice-atlas/` 源自 IELTS-practice（GPL-3.0，作者反对二次分发）。`practice-atlas/index.html` 中"项目仅授权 ZYZ Reading Walks 提供分发，小红书号：276752989"为原作者署名声明，保留勿删。
- 备份包为一次性云端快照，非自动同步：`/workspace/备份说明.md`。
