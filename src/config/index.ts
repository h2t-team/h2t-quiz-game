const {
  REACT_APP_API_URL,
  REACT_APP_GOOGLE_CLIENT_ID,
  REACT_APP_CLOUDINARY_ENDPOINT,
} = process.env;

export default {
  apiUrl: REACT_APP_API_URL ?? '',
  googleCliendId: REACT_APP_GOOGLE_CLIENT_ID ?? '',
  cloudinaryUrl: REACT_APP_CLOUDINARY_ENDPOINT as string,
};
