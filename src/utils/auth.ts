import { getItem } from './localStorage';

export const isLogin = () => {
  const token = getItem('h2t_access_token');
  return token ? true : false;
};
