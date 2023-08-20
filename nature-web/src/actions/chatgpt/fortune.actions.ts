import http from "../../app/http-common"


const doConversation = async (req: any) => {
  console.log(req)
  return await http.post('/api/fortune', req, {
    timeout: 180 * 1000
  })
    .then(({ data }) => {
      return data;
    })
    .catch((err: Error) => { console.log(err); throw err })
}
const fortuneAction = {
  doConversation,
}
export default fortuneAction