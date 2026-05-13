# BambooForest

> 急速に生えた竹林の木はそれぞれが独立しているように見えているが、それらは地下茎でつながっており最も大きな１つの生き物なのである。

ソフトウェアプロダクト集ページ。

## ローカル確認

```sh
cd ~/BambooForest
python3 -m http.server 8000
# → http://localhost:8000
```

## 構成

```
.
├── index.html
├── styles/main.css
├── scripts/main.js  # ← works 配列にプロダクトを追加していく
└── assets/hero.png
```

## プロダクトの追加

`scripts/main.js` の `works` 配列にオブジェクトを追加するだけ。

```js
{
  title: "プロダクト名",
  tag: "カテゴリ",
  description: "短い説明",
  url: "https://..."
}
```

## デプロイ

GitHub Pages（`piggest` org）想定。`main` ブランチを Pages のソースにする予定。
