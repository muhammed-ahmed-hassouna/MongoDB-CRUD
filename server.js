const express = require('express');
const app = express();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
app.use(express.json());
const mongoose = require("mongoose");
require('dotenv').config();
const DB_URI = process.env.DB_URI;
const port = process.env.PORT;

const store = new MongoDBStore({
    uri: DB_URI,
    collection: 'sessions',
});

app.use(session({
    secret:  process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
    store: store,
}));

mongoose.connect(DB_URI)
  .then(() => {
    console.log("Connected Successfully")
  }).catch((error) => {
    console.log("error with connecting with the db", error)
  })


  const userRoutes = require('./route/userRoutes');
  
app.use(userRoutes);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });