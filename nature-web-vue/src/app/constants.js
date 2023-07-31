export const SET_SCROLLY = 'scrolly'
export const FIREBASE_DOMAIN = 'https://firebasestorage.googleapis.com'
export const AVOID_CORS_URL = 'https://cors-anywhere.herokuapp.com/'

export const IMG_BASE_URL = process.env.REACT_APP_MOVIE_IMG_BASE_URL || '';

export const GET_FIREBASE_FILE_URL = (folder, filename) => {
  return `${FIREBASE_DOMAIN}/v0/b/nature-portfolio-7b1db.appspot.com/o/${folder}%2F${filename}?alt=media`;
}