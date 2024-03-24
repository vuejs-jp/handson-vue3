<script setup lang="ts">
defineProps<{
  name: string
  description: string
  price: number
  image: string
}>()

/** 価格を3桁ごとのカンマ付きで返す */
function pricePrefix(price: number): string {
  return price.toLocaleString()
}
</script>

<template>
  <div class="thumbnail">
    <img :src="image" alt="" />
  </div>
  <div class="description">
    <h2>{{ name }}</h2>
    <p>{{ description }}</p>
    <span>¥<span class="price">{{ pricePrefix(price) }}</span></span>
  </div>
</template>

<style>
.item > div.thumbnail > img {
  width: 100%;
  height: calc(100%);
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
