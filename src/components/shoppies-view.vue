<template>
  <div class="container">
    <h2>The Shoppies</h2>
    <div class="search-bar">
        <h3>Movie title</h3>
        <!-- Search-bar component -->
        <search-bar @search-changed="onSearchChanged"/>
    </div>
    <div class="row">
      <div class="column search-results">
        <h3>Result(s) for "{{searchedMovie}}"</h3>
          <h4 v-if="isTooManyResult">There is too many result. Please try to be more specific.</h4>
          <div 
            class="result-list" 
            v-for="movie in moviesResult"
            v-bind:key="movie.id"
          >
            <!-- Movie component -->
            <movie 
              :movie="movie"
              :isResult="true"
              @nominated="onNominated"
            />
          </div>
      </div>
      <div class="column nominations">
        <h3>Nominations</h3>
        <div 
          class="nomination-list" 
          v-for="movie in nominatedMovies"
          v-bind:key="movie.id"
        >
          <!-- Movie component -->
          <movie
            :movie="movie"
            :isNominated="true"
            @removed="onRemoved"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './search-bar.vue';
import Movie from './movie.vue';

import { ServiceFactory } from '../service/omdb-factory';

const OmdbService = ServiceFactory.get('movies');
export default {
  name: 'ShoppiesView',
  components: {
    SearchBar,
    Movie
  },
  data() {
    return {
      searchedMovie: '',
      isTooManyResult: false,
      moviesResult: [],
      nominatedMovies: []
    }
  },
  methods: {
    /**
     * Async method that call the Omdb service to get the searched movie.
     * @param searchInput The movie to be searched.
     */
    async onSearchChanged(searchInput) {
      this.searchedMovie = searchInput.trim();
      this.moviesResult = [];

      if (this.searchedMovie !== '') {
        const { data } = await OmdbService.getMoviesByTitle(searchInput.trim());
        if (data.Error) {
          this.isTooManyResult = true;
        } else {
          this.isTooManyResult = false;

          data.Search.forEach(movie => {
            this.moviesResult.push(movie);
          });
        }
      }
    },
    /**
     * Handle when a movie is nominated. Add the movie to the nomination list.
     * @param movie The movie to be added in the nomination list.
     */
    onNominated(movie) {
      this.nominatedMovies.push(movie);
    },

    /**
     * Handle when a movie is removed from the nomination list.
     * @param movie The movie to be removed from the nomination list.
     */
    onRemoved(movie) {
      const movieIndex = this.nominatedMovies.indexOf(movie);
      if (movieIndex !== -1) this.nominatedMovies.splice(movieIndex, 1);
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
  height: 100%;
}

.search-results {
  border: 2px solid gray;
  border-radius: 3px;
}

.nominations {
  border: 2px solid green;
  border-radius: 3px;
}

</style>
