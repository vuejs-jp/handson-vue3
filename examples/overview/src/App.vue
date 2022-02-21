// region template
<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>
// endregion template

// region script
<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
// endregion script

// region style
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
// endregion style
