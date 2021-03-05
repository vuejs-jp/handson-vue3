<template>
  <template v-for="item in items" :key="item.id">
    <div v-if="!item.soldOut" class="item" :class="{'selected-item': item.selected}" @click="item.selected = !item.selected">
      <div>
        <img src="./assets/logo.png" class="item-image">
      </div>
      <div>
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <span>価格: {{ item.price }}</span>
      </div>
    </div>
  </template>
</template>

<script>
export default {
  name: 'App',
  data: () => {
    return {
      items: [
        {
          id: 1,
          name: "商品１",
          description: "商品１の説明です",
          price: 100,
          selected: false
        },
        {
          id: 2,
          name: "商品２",
          description: "商品２の説明です",
          price: 200,
          selected: false
        },
        {
          id: 3,
          name: "商品３",
          description: "商品３の説明です",
          price: 300,
          selected: false
        },
        {
          id: 4,
          name: "商品４",
          description: "商品４の説明です",
          price: 400,
          selected: false,
          soldOut: true
        },
        {
          id: 5,
          name: "商品５",
          description: "商品５の説明です",
          price: 500,
          selected: false
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-wrap: wrap;
}

.item {
  width: 250px;
  padding-bottom: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.item-image {
  width: 250px;
  height: 250px;
}

.item > div > p {
  margin-bottom: 0px;
}

.selected-item {
  background-color: rgba(63, 63, 191, 0.5);
}
</style>
