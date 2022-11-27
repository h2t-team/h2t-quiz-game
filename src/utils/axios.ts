import axios from 'axios';
import config from 'config';

import { getItem } from './localStorage';

export const axiosWithToken = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Authorization: `Bearer ${getItem('h2t_access_token')}`,
  },
});
