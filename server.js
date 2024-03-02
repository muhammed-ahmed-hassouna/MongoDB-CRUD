const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
app.use(express.json());
const mongoose = require("mongoose");
require('dotenv').config();
const SwaggerJSDoc = require('swagger-jsdoc');
const SwaggerUI = require('swagger-ui-express');

const DB_URI = process.env.DB_URI;
const port = process.env.PORT;

const store = new MongoDBStore({
  uri: DB_URI,
  collection: 'sessions',
});

app.use(session({
  secret: process.env.SECRET,
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

const swaggerOptions = require('./swaggerDefinition');

const swaggerSpec = SwaggerJSDoc(swaggerOptions);

app.use(
  '/api-docs',
  SwaggerUI.serve,
  SwaggerUI.setup(swaggerSpec)
);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});