const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log('process.env.OPENAI_API_KEY', process.env.OPENAI_API_KEY)
const openai = new OpenAIApi(configuration);

const doChatGPT = async (messages) => {
  const maxRetries = 5;
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

  return completion?.data?.choices[0].message['content']
}

module.exports = doChatGPT