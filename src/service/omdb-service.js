import OmdbBaseConfig from './omdb-base-config';
import { config } from '../../config';

const resource = `?apikey=${config.SECRET_API_KEY}`;
export default {
  getMovieByTitle(title) {
    return OmdbBaseConfig.get(`${resource}&t=${title}`);
  }
}
