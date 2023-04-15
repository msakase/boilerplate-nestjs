## Description

NestJSの自分なりのboilerplate

## Getting Started

1. Node周りを準備してね。
2. リポジトリをクローン
```bash
$ git clone https://github.com/msakase/boilerplate-nestjs.git
```
3. フォルダに移動してインストール(以下はyarn)
```bash
$ cd 
$ yarn install
```
4. 起動
```bash
$ yarn start
```

## Migrationファイル作成
yarnでの引数の渡し方がわからんかった。
```bash
$ npm run migration:gen -name={付加する名前}
```

## Migration反映
マイグレーションは自動反映にしていないので以下のように実行してね。
### 開発環境に反映
```bash
$ yarn migration:run
```

※revertは上のrunをrevに変えて

## テスト実行
### Unit Test
```bash
$ yarn test
```

### e2e Test
```bash
$ yarn test:e2e
```

## 整形
### eslint
```bash
$ yarn lint
```

### prettier
```bash
$ yarn format
```

## ビルド
```bash
$ yarn build
```
