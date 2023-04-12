var express = require("express");
var request = require('request');
var app = express();

const HTTP_PORT = process.env.PORT | 8080;

app.get("/:text", (req, res) => {
  var options = {
    'method': 'POST',
    'url': 'https://api.openai.com/v1/chat/completions',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "user",
          "content": req.params.text
        }
      ]
    })
  };

  request(options, function (error, response) {
    if (error)
      throw new Error(error);
      
    res.send(JSON.parse(response.body).choices[0].message.content);
  });
});

app.listen(HTTP_PORT);
