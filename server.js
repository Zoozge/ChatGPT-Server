var express = require("express");
var request = require('request');
var app = express();

const HTTP_PORT = process.env.PORT | 8080;

app.get("/:text", (req, res) => {
  var options = {
    'method': 'POST',
    'url': 'https://api.openai.com/v1/completions',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      "model": "text-davinci-003",
      "prompt": req.params.text,
      "max_tokens": 512
    })
  };

  request(options, function (error, response) {
    if (error)
      throw new Error(error);
      
    res.send(JSON.parse(response.body).choices[0].text);
  });
});

app.listen(HTTP_PORT);
