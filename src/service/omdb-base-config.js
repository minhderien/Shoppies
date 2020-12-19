import axios from 'axios';

const baseDomain = 'http://www.omdbapi.com' ;
const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL
})