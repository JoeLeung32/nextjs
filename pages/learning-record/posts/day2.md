---
title: 'Day 2'
date: '2020-06-14'
commits: 5fd3fceaa047dbd4478e8166694df3c585b33ff2, 29a0703ecbe9790fe5d2a557935f7c6dab7d7f7f, 2f50cb93b74fede527e7250757690a8a858fb0e8, 6e82051c85d7dc4754d152f0ea8fb84fc4381cbc
---

昨日 Deploy 後發覺 console 有報 warning，pokemon 所有 *.js 檔都有問題，
找了很久都不知道為什麼以下兩款 Code 都會報錯。
```
<Link href={`/pokemon/[pokemonId]`} as={`/pokemon/${pokemonId}`} >
```
及
```
<Link href={`/pokemon/[pokemonId]`} passHref >
```
最後改名 Route.push() 解決了。

解決問題之後，今天主要想試試將 JavaScript 都轉成 TypeScript，想試試是不是所有 `*.js` 都可以轉成 `*.ts`。

_原來 `next.config.js` 是不能轉。_ __(ノ ゜Д゜)ノ ︵ ┻━┻

其實，今天真的是轉 TypeScript 而且，但不知撞甚麼鬼，覺得白白的頁面看膩了，套了 `Bootstrap`、`Sass`、`styled-components`。然後又覺得都套了 Style，不如弄一個 **Dark Mode Switcher** (Bootstrap)，然後鬼上身覺得都有了 Dark Mode，一定要把他儲到 Cookie  (•̀ᴗ•́)و ̑̑

因為第一次使用 `styled-components`，在一些地方卡了一下：

1. 原來要 _document.js
1. 將 _document.js 轉成 _document.tsx，花了點時間找 `DocumentContext` 在哪

而且是第二次使用 `TypeScript`，找 `Type` 找了一段時間，到最後仍有 14 個 `*: any` 在 10 個檔案裡。	(ಥ﹏ಥ)

到晚上九時多 t(ಠ益ಠt) 大致上多了一堆檔案：
```
context/PublicSetting.tsx
pages/_document.tsx
styled/index.tsx
styled/wrapper.tsx
themes/dark.tsx
themes/index.tsx
themes/light.tsx
.babelrc
styled.d.tsx
```

---
## 總結

今天玩了十一小時，碰了很多壁，踏了很多口釘。

_Sony A105 配 Sony NWZ-WH505 聽 Moov 16/24bit 夾到頭痛_ 💃🏻 🕺🏻