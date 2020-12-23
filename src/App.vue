<template>
  <div id="app">
    <ShoppiesView/>
  </div>
</template>

<script>
import ShoppiesView from './components/shoppies-view.vue'

export default {
  name: 'App',
  components: {
    ShoppiesView
  }
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
