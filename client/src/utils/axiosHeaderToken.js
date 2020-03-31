import axios from 'axios';

export const axiosHeaderToken = token => {
  if (token) {
    return (axios.defaults.headers.common['x-auth-token'] = token);
  }
};
