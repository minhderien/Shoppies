<template>
  <div class="container">
    <h2 class="title">The Shoppies</h2>
    <div class="search-bar">
      <!-- Search-bar component -->
      <search-bar @search-changed="onSearchChanged"/>
    </div>
    <center><h2>Your nominated movies</h2></center>
    <div class="nomination-grid">
      <div 
        class="nomination__item" 
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

      <div 
        class="nomination__item" 
        v-for="(emptyMovie, index) in emptyList"
        v-bind:key="index"
      >
        <empty-movie/>
      </div>
    </div>
    <center>
    <h3>Result(s) for "{{searchedMovie}}"</h3>
    <span>Click on a movie to add it to the nomination list</span>
    </center>
    <div :class="{'grid-container search-results': !isNominatedMovieFull, 'grid-container search-results--disable': isNominatedMovieFull}">
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
  </div>
</template>

<script>
import SearchBar from './search-bar.vue';
import Movie from './movie.vue';
import EmptyMovie from './empty-movie.vue';

import { ServiceFactory } from '../service/omdb-factory';


const OmdbService = ServiceFactory.get('movies');

const MAX_NOMINATED_MOVIES = 5;

export default {
  name: 'ShoppiesView',
  components: {
    SearchBar,
    Movie,
    EmptyMovie
  },
  data() {
    return {
      searchedMovie: '',
      isTooManyResult: false,
      moviesResult: [],
      nominatedMovies: [],
      emptyList: []
    }
  },
  computed: {
    /** Computed getter to return whether the nomination list is full or not */
    isNominatedMovieFull() {
      return this.nominatedMovies.length >= MAX_NOMINATED_MOVIES;
    },
    emptyNominatedMovieLength() {
      return MAX_NOMINATED_MOVIES - this.nominatedMovies.length;
    }
  },
  mounted() {
    for(let i = 0; i < MAX_NOMINATED_MOVIES; i++) {
      this.emptyList.push(i);
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
      // Add to nominated array
      this.nominatedMovies.push(movie);

      // Replace empty array
      const nominatedMovieIndex = this.nominatedMovies.indexOf(movie);
      const emptyListLength = this.emptyList.length - 1;
      this.emptyList.splice(emptyListLength - nominatedMovieIndex, 1);
      
      // Delete from search array
      const movieIndexInResult = this.moviesResult.indexOf(movie);
      if (movieIndexInResult !== -1) this.moviesResult.splice(movieIndexInResult, 1);
    },

    /**
     * Handle when a movie is removed from the nomination list.
     * @param movie The movie to be removed from the nomination list.
     */
    onRemoved(movie) {
      // Remove from nominated array
      const movieIndex = this.nominatedMovies.indexOf(movie);
      if (movieIndex !== -1) this.nominatedMovies.splice(movieIndex, 1);

      // Populate emptyList array.
      this.emptyList.push(movieIndex);
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
  border-radius: 3px;

  &--disable {
    pointer-events: none;
  }
}

.search-bar {
  text-align: center;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(8, auto);
  padding: 24px 0 0 72px ;
  gap: 10px 20px;
}

.nomination-grid {
  display: grid;
  grid-template-columns: repeat(5, 172px);
  padding-top: 16px;
  justify-content: center;
}

.nomination {
  &__item {
    margin: auto;
  }
}


</style>
