<template>
  <footer class="footer">
    <span class="label">合計</span>
    <span class="unit">¥</span>
    <span class="value">{{ sum }}</span>
  </footer>
</template>

<script setup>
import { computed, inject } from 'vue';

const items = inject('items')

const sum = computed(() => 
  items.value.reduce((acc, item) => {
    if(!item.selected){
      return acc
    }
    return acc + item.price
  }, 0)
) 
</script>

<style>
.footer {
  top: 100vh;
  position: sticky;
  padding: 10px 5%;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  background-color: aqua;
}

.label {
  font-size: 18px;
  margin-right: 5px;
}

.unit {
  font-size: 20px;
}

.value {
  font-size: 28px;
  font-weight: bold;
}
</style>