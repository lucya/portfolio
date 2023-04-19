export const SET_SCROLLY = 'scrolly'
export const FIREBASE_DOMAIN = 'https://firebasestorage.googleapis.com'
export const AVOID_CORS_URL = 'https://cors-anywhere.herokuapp.com/'

export const GET_FIREBASE_FILE_URL = (filename) => {
  return `${FIREBASE_DOMAIN}/v0/b/nature-portfolio-7b1db.appspot.com/o/${filename}?alt=media`;
}