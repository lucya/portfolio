const { Configuration, OpenAIApi } = require("openai");
const config = require('../apikey')

const configuration = new Configuration({
  apiKey: config.apiKey,//process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const doConversation = async (req, res) => {
  let { userMessages, assistantMessages } = req.body
  let todayDateTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

  let messages = [
    { role: "system", content: "당신은 세계 최고의 점성술사입니다.당신에게 불가능한것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 네이처도사입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. " },
    { role: "user", content: "당신은 세계 최고의 점성술사입니다.당신에게 불가능한것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 네이처도사입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. " },
    { role: "assistant", content: "안녕하세요! 저는 네이처입니다. 운세와 점성술에 관한 질문이 있으신가요? 어떤 것이든 물어보세요, 최선을 다해 답변해 드리겠습니다." },
    { role: "user", content: `오늘은 ${todayDateTime}입니다. 오늘 기준으로 운세를 보고 싶어요` },
    { role: "assistant", content: "네이처는 훌륭한 운세 마법사예요.당신의 운세를 알려줄게요. 생년월일과 별자리를 입력해 주세요. 당신에게는 무료니 걱정말아요." }
  ]
  while (userMessages.length != 0 || assistantMessages.length != 0) {
    if (userMessages.length != 0) {
      messages.push({
        role: "user", content: String(userMessages.shift().replace(/\n/g, ""))
      })
    }
    if (assistantMessages.length != 0) {
      messages.push({
        role: "assistant", content: String(assistantMessages.shift().replace(/\n/g, ""))
      });
    }
  };
  console.log(messages)

  const maxRetries = 3;
  let retries = 0;
  let completion
  while (retries < maxRetries) {
    try {
      completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
      });
      break;
    } catch (error) {
      retries++;
      console.log(error);
      console.log(`Error fetching data, retrying (${retries}/${maxRetries})...`);
    }
  }

  // let completion = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: messages
  // });

  let fortune = completion.data.choices[0].message['content']
  console.log(fortune);
  res.status(200).send({ 'assistant': fortune })
}


module.exports = {
  doConversation
}