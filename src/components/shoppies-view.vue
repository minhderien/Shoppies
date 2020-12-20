<template>
  <div class="container">
    <h2 class="title">The Shoppies</h2>
    <div class="search-bar">
        <h3>Movie title</h3>
        <!-- Search-bar component -->
        <search-bar @search-changed="onSearchChanged"/>
    </div>
    <div class="row">
      <div :class="{'column search-results': !isNominatedMovieFull, 'column search-results--disable': isNominatedMovieFull}">
        <h3>Result(s) for "{{searchedMovie}}"</h3>
          <h4 v-if="isTooManyResult">There is too many results. Please try to be more specific.</h4>
          <div 
            class="search-results__item" 
            v-for="movie in moviesResult"
            v-bind:key="movie.id"
          >
            <!-- Movie component -->
            <movie 
              :movie="movie"
              :is-result="true"
              @nominated="onNominated"
            />
          </div>
      </div>
      <div class="column nominations">
        <h3>Nominations</h3>
        <div 
          class="nominations__item" 
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
  computed: {
    /** Computed getter to return whether the nomination list is full or not */
    isNominatedMovieFull() {
      return this.nominatedMovies.length >= 5;
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
      this.isTooManyResult = false;

      if (this.searchedMovie !== '') {
        const { data } = await OmdbService.getMoviesByTitle(searchInput.trim());
        if (data.Error) {
          this.isTooManyResult = true;
        } else {
          this.isTooManyResult = false;

          data.Search.forEach(movie => {
            // Search if the movie is already nominated
            const movieIndex = this.nominatedMovies.findIndex(nominatedMovie => nominatedMovie.imdbID === movie.imdbID);
            if (movieIndex === -1) this.moviesResult.push(movie);
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
      
      const movieIndexInResult = this.moviesResult.indexOf(movie);
      if (movieIndexInResult !== -1) this.moviesResult.splice(movieIndexInResult, 1);
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
.title {
  text-align: center;
}

.title::before {
  content: "🏆";
}

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

  &--disable {
    pointer-events: none;
  }
}

.nominations {
  border: 2px solid green;
  border-radius: 3px;
}

</style>
