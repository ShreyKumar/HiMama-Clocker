const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//User manager controls Users
const users = require('./user_manager.js').users;

//Routes
app.post("/clock/in", (req, res) => {
  const ret = users.clock("in", req.body.firstname, req.body.lastname)
  res.send(ret)
})

app.post("/clock/out", (req, res) => {
  const ret = users.clock("out", req.body.firstname, req.body.lastname)
  res.send(ret)
})

app.get("/clock/get", (req, res) => {
  res.send(users.allusers)
})

app.listen(port, () => console.log(`Listening on port ${port}`));
