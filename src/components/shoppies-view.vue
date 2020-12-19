<template>
  <div class="container">
    <h2>The Shoppies</h2>
    <div class="search-bar">
        <!-- Add search component -->
        <h3>Search for something</h3>
        <search-bar @search-changed="onSearchChanged"/>
    </div>
    <div class="row">
      <div class="column search-results">
        <h3>Result(s) for "placeholder"</h3>
          <div 
            class="nomination-list" 
            v-for="movie in moviesResult"
            v-bind:key="movie.id"
          >
            <movie/>
          </div>
        <!-- Add search's result component -->
      </div>
      <div class="column nominations">
        <h3>Nominations</h3>
        <div 
          class="nomination-list" 
          v-for="movie in nominatedMovies"
          v-bind:key="movie.id"
        >
          <movie/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './search-bar.vue';
import Movie from './movie.vue';
//import axios from 'axios'

export default {
  name: 'ShoppiesView',
  components: {
    SearchBar,
    Movie
  },
  data() {
    return {
      moviesResult: [],
      nominatedMovies: []
    }
  },
  methods: {
    onSearchChanged(searchInput) {
      console.log('capture emitted event :', searchInput);
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  text-align: left;
}

.row {
  display: flex;
}

.column {
  flex: 50%;
  height: 50vh;
}

</style>
