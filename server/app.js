const express = require('express');
const cors = require('cors');
const app = express();
const configRoutes = require('./routes');
const session = require('express-session');

app.use(cors());
app.use(express.json());

app.use(session({
  name: 'AuthCookie',
  secret: 'CS546_Final_Project_GottaGo',
  resave: false,
  saveUninitialized: true
}));

configRoutes(app);

app.listen(9000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:9000');
});