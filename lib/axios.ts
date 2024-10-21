

import axios from 'axios';
const axiosClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',  
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`, 
  },
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, 
  },
});

export default axiosClient;
