const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//User manager controls Users
const users = require('./user_manager.js').users;

//Routes
app.post("/clock/in", (req, res) => {
  const ret = users.clock("in", req.body.firstname, req.body.lastname)
  console.log("this is ret")
  console.log(ret)
  res.send(ret)
})

app.post("/clock/out", (req, res) => {
  const ret = users.clock("out", req.body.firstname, req.body.lastname)
  res.send(ret)
})

app.get("/clock/get", (req, res) => {
  res.send(users.allusers)
})
// Only for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
