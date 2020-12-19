<template>
  <div>
    <input v-model="searchInput" v-on:input="onInput"/>
  </div>
</template>

<script>
import { debounce } from '../util/debounce'

export default {
  name: 'SearchBar',
  data() {
    return {
      searchInput: ''
    }
  },
  methods: {
    onInput: debounce(function (){
      this.$emit('search-changed', this.searchInput);
    },500)
  }
}
</script>

<style lang="scss" scoped>


</style>