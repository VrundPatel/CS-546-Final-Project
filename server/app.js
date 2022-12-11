const express = require("express");
const cors = require("cors");
const app = express();
const configRoutes = require("./routes");
const session = require("express-session");
const settings = require("./config/settings.json").mongoConfig;
const MongoDBStore = require("connect-mongodb-session")(session);

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = new MongoDBStore({
  uri: settings.serverUrl,
  databaseName: settings.database,
  collection: "userSessions",
});

store.on("error", function (error) {
  console.log(error);
});

app.use(
  session({
    name: "AuthCookie",
    secret: "CS546_Final_Project_GottaGo",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 3,
    },
    store: store,
  })
);

configRoutes(app);

app.listen(9000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:9000");
});
