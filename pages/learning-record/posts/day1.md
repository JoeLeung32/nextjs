---
title: 'Day 1 初學 Next'
date: '2020-06-13'
commits: 817544fecd131501b6c943230b6270700dbe7127, 0adb3eaaa6d8898a690dc2c0ac88266dc9ddccc2, b15730b8d2220b1823df54e6e7f32553ac58b619
---

1. 建立 GitHub Repo：[@JoeLeung32/nextjs](https://github.com/JoeLeung32/nextjs)
1. 建立 HeroKu 帳戶：[heroku.com](https://www.heroku.com/)
1. 配置開發環境：[README.md](https://github.com/JoeLeung32/nextjs/blob/master/README.md)
1. 手動配置 NextJS，並不是使用 `create-next-app`，請參看 [STEP1_ManualSetupNextjs.md](https://github.com/JoeLeung32/nextjs/blob/master/readme/STEP1_ManualSetupNextjs.md)
1. 配置 package.json [package.json](https://github.com/JoeLeung32/nextjs/commit/817544fecd131501b6c943230b6270700dbe7127#diff-b9cfc7f2cdf78a7f4b91a753d10865a2) `commit 817544f`
1. 參考 [官方教學](https://nextjs.org/learn/basics/create-nextjs-app) 跑了
    1. Create a Next.js App
    1. Navigate Between Pages
    1. Assets, Metadata, and CSS
    1. Pre-rendering and Data Fetching
1. Deploy

這天是用 JavaScript 開始，花了一些時間去配置 `eslint` 及 `prettier`，再跟着教學一步一步走。

除了資料夾及檔案名稱都可以使用 `/product/[type]/[id].js` 來製作網址外，以下都有一些新的東西：
```
pages/_app.jsx
next.config.js
next-env.d.js
server.js
```

## Pre-rendering

這個方面使用了 [GitHub API](https://api.github.com/users/joeleung32) 去嘗試 `getStaticProps()`，
再使用 [Poke API](https://pokeapi.co/) 測一下將所有 Pokemon 都被 `next build` 收服會有多久。

## Deploy

Deploy 方面沒跟教學使用 `git` 上 Heroku，而使用了 **GitHub Integration** [方案](https://devcenter.heroku.com/articles/github-integration)，由它自行 Deploy。

---
## 總結

玩了五小時，我個人喜歡 Next 多於 Gatsby。

_Sony A105 配 Sony WH-1000XM3 聽 Moov 16/24bit 超爽_ _ _ (͠≖ ͜ʖ͠≖)