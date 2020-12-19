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
    /**
     * Debounce function to reduce api call on input changes. The api call is
     * only made when the user has not written after 1000ms.
     * The api call will be made in the parent when it captures the emitted event.
     */
    onInput: debounce(function (){
      this.$emit('search-changed', this.searchInput);
    },500)
  }
}
</script>

<style lang="scss" scoped>


</style>