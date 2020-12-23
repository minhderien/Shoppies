<template>
  <div class="container" ref="container">
    <h1 class="title">The Shoppies</h1>
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
          :is-nominated="true"
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
      <button v-if="isNominatedMovieFull" class="share-button" type="button" @click="onButtonClicked">Share</button>
      <h3>Result(s) for "{{searchedMovie}}"</h3>
      <span v-if="!isSharedButtonClicked">{{infoMessage}}</span>
      <span v-else>Copied to clipboard 📋</span>
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
            :is-nominated="isNominated(movie)"
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
const ADD_MOVIE_MESSAGE = 'Click on a movie to add it to the nomination list.';
const FULL_NOMINATE_LIST_MESSAGE = '🏆 Nice nomination list 🏆 To edit your nominated movies, simply click to remove it and add another one.';

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
      numberOfMovieResult: 0,
      numberOfPages: 0,
      moviesResult: [],
      nominatedMovies: [],
      emptyList: [],
      isScrolledToBottom: false,
      currentPage: 1,
      isSharedButtonClicked: false
    }
  },
  computed: {
    /** Computed getter to return whether the nomination list is full or not */
    isNominatedMovieFull() {
      return this.nominatedMovies.length === MAX_NOMINATED_MOVIES;
    },

    infoMessage() {
      return this.isNominatedMovieFull ? FULL_NOMINATE_LIST_MESSAGE : ADD_MOVIE_MESSAGE;
    }
  },
  mounted() {
    for(let i = 0; i < MAX_NOMINATED_MOVIES; i++) {
      this.emptyList.push(i);
    }
    this.scroll();
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
      this.numberOfMovieResult = 0;
      this.numberOfPages = 0;
      this.currentPage = 1;

      if (this.searchedMovie !== '') {
        const { data } = await OmdbService.getMoviesByTitle(searchInput.trim());
        if (data.Error) {
          this.isTooManyResult = true;
        } else {
          this.numberOfMovieResult = data.totalResults;
          if (this.numberOfMovieResult >= 10) {
            this.numberOfPages = Math.ceil(this.numberOfMovieResult / 10);
          }
          this.isTooManyResult = false;

          data.Search.forEach(movie => {
             this.moviesResult.push(movie);
          });
        }
      }
    },

    /**
     * Get the list of movies by page.
     * @param searchedMovie The movie being searched.
     * @param page The page to search.
     */
    async onNextPage(searchedMovie, page) {
      const { data } = await OmdbService.getMoviesByTitleWithPage(searchedMovie, page);
      data.Search.forEach(movie => {
        // Search if the movie is already nominated
        const movieIndex = this.nominatedMovies.findIndex(nominatedMovie => nominatedMovie.imdbID === movie.imdbID);
        if (movieIndex === -1) this.moviesResult.push(movie);
      });
    },
    /**
     * Handle when a movie is nominated. Add the movie to the nomination list.
     * @param movie The movie to be added in the nomination list.
     */
    onNominated(movie) {
      // Add to nominated array
      if (this.nominatedMovies.length < MAX_NOMINATED_MOVIES) {
        this.nominatedMovies.push(movie);

        // Replace empty array
        const nominatedMovieIndex = this.nominatedMovies.indexOf(movie);
        const emptyListLength = this.emptyList.length - 1;
        this.emptyList.splice(emptyListLength - nominatedMovieIndex, 1);
      }

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
    },

    /**
     * Handle when the user scroll on the page
     */
    scroll() {
      window.onscroll = async () => {
        const maxScrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
        let isBottomOfWindow = Math.ceil(maxScrollTop) + window.innerHeight >= document.documentElement.offsetHeight;
        this.isScrolledToBottom = isBottomOfWindow;
      
        if (isBottomOfWindow && (this.currentPage < this.numberOfPages)) {
          await this.onNextPage(this.searchedMovie, ++this.currentPage);
          isBottomOfWindow = false;
        }
      }
    },

    /**
     *  Return whether the movie is nominated or not
     * @param movie The targeted movie.
     */
    isNominated(movie) {
      const nominatedMovieIndex = this.nominatedMovies.findIndex(nominatedMovie => nominatedMovie.imdbID === movie.imdbID)
      return nominatedMovieIndex !== -1;
    },
    
    onButtonClicked() {
      this.isSharedButtonClicked = true;
      setTimeout(() => {
        this.isSharedButtonClicked = false;
      }, 3000);
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
  grid-template-columns: repeat(5, auto);
  padding: 88px;
  gap: 64px;
  justify-content: center;
}

.nomination-grid {
  display: grid;
  grid-template-columns: repeat(5, auto);
  padding-top: 16px;
  gap: 64px;
  justify-content: center;
}

.nomination {
  &__item {
    margin: auto;
  }
}

.share-button {
  border-radius: 12px;
  cursor: pointer;
  font-size: 24px;
  margin-top: 16px;
  outline: none;
}
</style>
