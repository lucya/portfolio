const { _getTsunamiShelter1List } = require('../services/govService')

const getTsunamiShelter1List = (req, res) => {
  const { pageNo, numOfRows } = req.query;
  
  _getTsunamiShelter1List(pageNo, numOfRows, function (data) {

    res.status(200).send(data)

  })
}
module.exports = {
  getTsunamiShelter1List
}