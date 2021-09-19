<template>
  <header class="header">
    <img src="/images/logo.svg" alt="" />
    <h1>Vue.js ハンズオン</h1>
  </header>
  <main class="main">
    <div class="item">
      <div class="thumbnail">
        <img :src="item.image" alt="" />
      </div>
      <div class="description">
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
        <span>¥<span class="price">{{ item.price }}</span></span>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      item: {
        name: 'アボカドディップバケット',
        description:
          '刻んだ野菜をアボカドと混ぜてディップに。こんがり焼いたバゲットとお召し上がりください。',
        price: 480,
        image: '/images/item1.jpg'
      }
    }
  }
}
</script>

<style>
body {
  font-family: sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 90%;
  margin: 0 5%;
  text-align: center;
  color: #242424;
}

.header {
  display: flex;
  align-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
}

.header > img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.header > h1 {
  font-size: 80px;
  font-weight: bold;
  line-height: 80px;
  margin-top: 0;
  margin-bottom: 0;
}

.main {
  display: grid;
  grid-template-columns: 3fr 3fr 3fr 3fr;
  column-gap: 24px;
  row-gap: 24px;
}

.item {
  padding: 10px;
  cursor: pointer;
}

.item:hover {
  transition: 0.2s transform ease-out;
  transform: scale(1.05);
}

.item > div.thumbnail > img {
  width: 100%;
  height: calc(width);
  object-fit: cover;
}

.item > div.description {
  text-align: left;
  margin-top: 20px;
}

.item > div.description > p {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 18px;
  line-height: 25px;
}

.item > div.description > span {
  display: block;
  margin-top: 10px;
  font-size: 20px;
}

.item > div.description > span > .price {
  font-size: 28px;
  font-weight: bold;
}
</style>
