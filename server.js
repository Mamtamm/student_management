const express = require('express');
const jwt = require('express-jwt');
const { corsmw } = require('./middelwares/corsmw');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

const publicRoutes = [/\/auth\/*/, '/user/register'];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  jwt({
    secret: process.env.JWT,
    algorithms: ['HS256'],
    resultProperty: 'locals.decoded.user',
  }).unless({ path: publicRoutes })
);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.header('Access-Control-Allow-Origin', '*');
    res.status(401).send({
      status: 401,
      errorCode: 'TOKEN_EXPIRED',
      error: 'Unauthorized',
    });
  } else {
    next(err);
  }
});

app.use('/', corsmw, require('./api'));

app.listen(port, () => {
  console.log(`Server listening on \nURL -> http://localhost:${port}`);
});

module.exports = app;
