const express = require("express");
const app = express();
const configRoutes = require("./routes");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

configRoutes(app);

app.listen(9000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:9000");
});
