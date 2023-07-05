import http from "../../app/http-common"


const doConversation = async (req: any) => {
  console.log(req)
  const res = await http.post('/fortune', req, {
    timeout: 180 * 1000
  })
    .catch((err: Error) => { console.log(err); throw err })
  console.log('response ', res.data)
  return res.data
}
const fortuneAction = {
  doConversation,
}
export default fortuneAction