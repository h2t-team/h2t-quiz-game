const { REACT_APP_API_URL, REACT_APP_GOOGLE_CLIENT_ID } = process.env;

export default {
  apiUrl: REACT_APP_API_URL ?? '',
  googleCliendId: REACT_APP_GOOGLE_CLIENT_ID ?? '',
};
