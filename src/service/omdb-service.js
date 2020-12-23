import OmdbBaseConfig from './omdb-base-config';
import { config } from '../../config';

const resource = `?apikey=${config.SECRET_API_KEY}`;
export default {
  /**
   * Fetch a list of movies from the OMDB api.
   * @param title The title to search.
   */
  getMoviesByTitle(title) {
    return OmdbBaseConfig.get(`${resource}&s=${title}&type=movie`);
  },

  /**
   * Fetch a single movie by it's imdbID.
   * @param imdbID The targeted id to search.
   */
  getMoviesByImdbID(imdbID) {
    return OmdbBaseConfig.get(`${resource}&i=${imdbID}&type=movie`);
  },
  
  /**
   * Fetch movies by page.
   * @param title The title to search. 
   * @param page The page to fetch.
   */
  getMoviesByTitleWithPage(title, page) {
    return OmdbBaseConfig.get(`${resource}&s=${title}&type=movie&page=${page}`);
  }
}
