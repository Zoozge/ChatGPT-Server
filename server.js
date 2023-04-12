var express = require("express");
var app = express();

const HTTP_PORT = process.env.PORT | 8080;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(HTTP_PORT);
