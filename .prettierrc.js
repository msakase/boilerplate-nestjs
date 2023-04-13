module.exports = {
  // アロー関数の()が省略可能でも常に書く
  //  allow: 常に書く
  //  avoid: 省略可能なときは書かない
  arrowParens: "avoid",
  // オブジェクトリテラルの角括弧の内側にスペースを入れる。（true: デフォルト）
  bracketSpacing: true,
  // Prettierがファイルに埋め込まれた引用コードをフォーマットするかどうかを制御
  //  off: 埋め込まれたコードを自動的にフォーマットしない
  //  auto: Prettierが自動的に識別できる場合、埋め込みコードをフォーマットする（デフォルト）
  embeddedLanguageFormatting: "auto",
  // 改行の文字コードを指定
  //  lf, crlf, cr, auto（デフォルト）
  endOfLine: "auto",
  // HTMLファイルのグローバルな空白の感度を指定
  //  css: displayプロパティのデフォルト値を尊重（デフォルト）
  //  strict: 空白を区別する
  //  ignore: 空白は区別しない
  htmlWhitespaceSensitivity: "css",
  // JSXでのクウォート true: シングルクォート、false: ダブルクウォート（デフォルト）
  jsxSingleQuote: false,
  // 使用するパーサーを指定
  parser: "typescript",
  // 折り返す行の長さ
  printWidth: 120,
  // markdownの折返しの設定
  //  always: Print Widthで指定した値を超える時は折り返す
  //  never: 折り返さない
  //  preserve: そのまま折り返す（デフォルト）
  proseWrap: "preserve",
  // オブジェクトのプロパティが引用されるときに変更
  //  as-needed: 必要な場合のみ引用符で囲む
  //  consistent: 少なくとも1つのプロパティに必要な場合はすべてのプロパティを引用符で囲む
  //  preserve: 入力された引用符を尊重する
  quoteProps: "as-needed",
  // 最後にセミコロンを追加。falseの場合はエラー箇所のみ
  semi: true,
  // true: シングルクォート、false: ダブルクウォート
  singleQuote: true,
  // インデントのスペースの数
  tabWidth: 2,
  // 末尾のカンマ
  //  es5: ES5で有効な末尾のカンマ
  //  none: カンマをつけない（デフォルト）
  //  all: 可能な限り末尾にカンマをつける
  trailingComma: "all",
  // スペースではなくタブで行をインデントする（false: デフォルト）
  useTabs: false,
  // Vueファイル内の<script>と<style>をインデントするかどうかの指定
  vueIndentScriptAndStyle: false
}