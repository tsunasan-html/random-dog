<template>
  <div class="about">
    <h1>アプリについて</h1>
    <p>
      このアプリは <strong>Vue.js (Vue CLI)</strong> を使って構築した
      Webアプリです。<br />  
      犬の画像をランダムで取得できる 
      <a href="https://dog.ceo/dog-api/" target="_blank" rel="noopener noreferrer">Dog CEO API</a> 
      を利用しています。
    </p>

    <p>
      ランダムに犬の画像を表示し、ハートボタンでお気に入り登録。<br />  
      「My Dogs」で一覧表示や削除ができます。
    </p>

    <h2>主な技術</h2>
    <ul>
      <li>Vue.js</li>
      <li>Vue Router</li>
      <li>Vuex</li>
      <li>Local Storage</li>
      <li>Dog CEO API</li>
    </ul>

    <h2>主な機能</h2>
    <ul>
      <li>ランダムな犬の画像を取得</li>
      <li>画像をお気に入りに追加</li>
      <li>お気に入り一覧の表示</li>
      <li>お気に入りの削除</li>
      <li>ブラウザを閉じてもお気に入りを保持</li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.about {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
  line-height: 1.6;
}
.about h1 {
  font-size: 28px;
  margin-bottom: 16px;
}
.about h2 {
  font-size: 20px;
  margin-top: 20px;
}
.about a {
  color: #2563eb;
  text-decoration: underline;
}
</style>
