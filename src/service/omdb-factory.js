import OmdbService from './omdb-service';

const services = {
  movies: OmdbService
}

export const ServiceFactory = {
  get: name => services[name]
}