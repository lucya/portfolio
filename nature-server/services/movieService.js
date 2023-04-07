const { MOVIE_API_KEY, moviedb } = require('../db/movieDb')


const _getPopularMovies = async (_page) => {
  let page = _page || 1;

  try {
    const res = await moviedb.moviePopular({ page, language: 'ko' })
    console.log(res.results)
    return res.results;
  } catch (err) {
    console.log(err)
    throw err;
  }


}

const _getMovieInfo = async (id) => {

  try {
    const res = await moviedb.movieInfo({ id, language: 'ko' })
    console.log(res)
    return res;
  } catch (error) {
    console.log(error)
    throw error;
  }

}

module.exports = {
  _getPopularMovies,
  _getMovieInfo
}