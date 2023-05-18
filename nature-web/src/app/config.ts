export const SET_SCROLLY: string = 'scrolly'
export const FIREBASE_DOMAIN: string = 'https://firebasestorage.googleapis.com'
export const AVOID_CORS_URL: string = 'https://cors-anywhere.herokuapp.com/'

export const IMG_BASE_URL: string = process.env.REACT_APP_MOVIE_IMG_BASE_URL || '';

export const GET_FIREBASE_FILE_URL = (filename: string): string => {
  return `${FIREBASE_DOMAIN}/v0/b/nature-portfolio-7b1db.appspot.com/o/${filename}?alt=media`;
}