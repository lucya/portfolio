const { _getPopularMovies, _getMovieInfo } = require('../services/movieService')

const getPopularMovies = async (req, res) => {
  const page = req.query.page
  console.log('page is', req.query)
  const list = await _getPopularMovies(page)
    .catch(error => { res.status(400).send(error); })
  res.status(200).send(list);
}

const getMovieInfo = async (req, res, next) => {
  const id = req.params.id;
  const data = await _getMovieInfo(id)
    .catch(error => { res.status(400).send(error); })
  // console.log('Movie info data', data)
  res.status(200).send(data);
}

module.exports = {
  getPopularMovies,
  getMovieInfo
}