import axios from 'axios';

const origin =
  typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

export const axiosPublic = axios.create({
  baseURL: origin + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
