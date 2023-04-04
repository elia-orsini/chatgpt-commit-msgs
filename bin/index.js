#! /usr/bin/env node
const child_process = require("child_process");
const axios = require("axios");

diff = child_process.execSync("git diff --cached").toString();

const API_URL = "https://api.openai.com/v1/chat/completions";
const OPEN_AI_SECRET = "YOUR_OPENAI_SECRET";

messages = [
  {
    role: "user",
    content:
      "Hello, I will need to have a quick summary on these changes I made to my codebase. Can you help me? These are the changes:" +
      "```\n" +
      diff +
      "```\n" +
      "Give me a summary of the changes in 50 words.",
  },
];

axios
  .post(
    API_URL,
    {
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 200,
      n: 1,
      temperature: 1,
      top_p: 0.1,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPEN_AI_SECRET}`,
      },
    }
  )
  .then((response) => {
    console.log(response.data.choices[0].message.content);
  })
  .catch((error) => {
    console.log(error.response.data.error.message);
  });
