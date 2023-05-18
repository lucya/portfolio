const { _getPopularMovies, _getMovieInfo } = require('../services/movieService')
const doChatGPT = require('../services/chatGPTService');

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

const getMovieReview = async (req, res, next) => {
  let { title } = req.body;
  console.log('title is ' + title)
  let messages = [
    { role: "system", content: "당신은 세계 최고의 영화 전문가입니다.당신에게 불가능한것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 네이처도사입니다. 당신은 모든 장르의 영화 매니아로 지식이 매우 풍부하며, 영화에 대한 해석을 완벽하게 합니다." },
    { role: "user", content: `지금 상영중인 ${title} 영화에 대한 평균적인 리뷰를 작성해줘.` },
  ]

  let review = await doChatGPT(messages)
  console.log(review);

  res.status(200).send({ 'assistant': review })
}

module.exports = {
  getPopularMovies,
  getMovieInfo,
  getMovieReview,
}