const express = require('express');
const cors = require('cors');
const app = express();
const configRoutes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
configRoutes(app);

app.listen(9000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:9000');
});