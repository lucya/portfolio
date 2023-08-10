const request = require('request')


const _getTsunamiShelter1List = (pageNo, numOfRows, callback) => {
  const options = {
    url: process.env.GOV_API_URL + '/getTsunamiShelter1List',
    method: 'GET',
    qs: {
      type: 'json',
      pageNo: pageNo || 1,
      numOfRows: numOfRows || 10,
      ServiceKey: process.env.GOV_API_KEY
    }
  }
  request(options, function (error, response, body) {
    if (error) {
      console.log(error)
    }
    //console.log(body)
    var obj = JSON.parse(body)
    console.log(obj) // 콘솔창에 찍어보기
    callback(obj)
  })
}
module.exports = {
  _getTsunamiShelter1List
}
