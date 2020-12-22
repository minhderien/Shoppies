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
  }
}
