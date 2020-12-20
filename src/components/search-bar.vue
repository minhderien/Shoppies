<template>
  <div class="search">
    <i class="fa fa-search"></i>
    <input v-model="searchInput" class="search-bar" @input="onInput" size="64" height="24" placeholder="Search for your amazing movie"/>
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
     * only made when the user has not written after 500 ms.
     * The api call will be made in the parent when it captures the emitted event.
     */
    onInput: debounce(function (){
      this.$emit('search-changed', this.searchInput);
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
@import url("//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css");

.search { position: relative; }
.search input { text-indent: 30px;}
.search .fa-search { 
  font-size: 15px;
  padding-left: 8px;
  position: absolute;
  top: 12px;
}

.search-bar {
  border-radius: 6px;
  line-height: 32px;
  outline: none;
}


</style>