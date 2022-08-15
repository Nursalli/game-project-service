require('dotenv').config();

const express = require('express');
const getVersion = require('./utils/version');

const usersRouter = require('./domains/users/router');
const gamesRouter = require('./domains/games/router');

const { ErrorResponse } = require('./utils/response');
const { AppError } = require('./utils/error');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json({ limit: '1mb' }));

app.use(function (req, res, next) {
  res.setHeader('Version', getVersion());
  next();
});

app.use('/users', usersRouter);
app.use('/games', gamesRouter);

app.all('*', (req, res) => {
  const response = new ErrorResponse('Not Found', {
    details: 'Route Not Found Error',
  });

  res.status(404).send(response);
});

app.use(async (err, req, res, next) => {
  console.error('error unexpected:', err);
  console.error('error stack:', err.stack);

  let message = 'Internal Server Error';
  let errorData = {};
  let status = 500;

  if (err instanceof AppError) {
    errorData = {
      details: Object.keys(err.errData).length ? err.errData : err.message,
    };
    message = err.message;
    status = err.status;
  }

  const response = new ErrorResponse(message, errorData);
  res.status(status).send(response);
});

app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
