import axios from 'axios';

const baseDomain = 'https://www.omdbapi.com' ;
const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL
})