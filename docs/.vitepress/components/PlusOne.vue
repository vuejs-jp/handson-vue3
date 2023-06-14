<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: '+1 チャレンジ',
    required: false
  },
  content: {
    type: String,
    default: 'ここまでの学習が完了した人は、以下の内容にも挑戦してみましょう。',
    required: false
  },
});
</script>

<template>
  <div class="plusone_wrapper">
    <div class="plusone_sign">{{ name }}</div>
    <div class="plusone_content">{{ content }}</div>
  </div>
</template>

<style scoped>
.plusone_wrapper {
  margin-top: 48px;
  box-shadow: 0px -5px 10px -5px rgba(0, 0, 0, .1) inset;
}
.plusone_sign {
  background-color: var(--vp-c-brand);
  padding: 5px 10px;
  border-radius: 10px 10px 0 0;
  color: white;
  font-weight: bold;
  font-size: 12px;
  width: 100px;
  display: grid;
  place-items: center;
}
.plusone_content {
  color: var(--vp-c-brand);
  font-weight: bold;
  padding: 10px 0;
 
}
@media screen and (min-width: 480px) {
  .plusone_wrapper {
    display: flex;
    align-items: stretch;
  }
  .plusone_content {
    width: calc(100% - 100px);
    margin: 0 0 0 15px;
  }
}
</style>
