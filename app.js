require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const helmet = require('helmet');
const process = require('node:process');
const { errors, CelebrateError } = require('celebrate');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const usersRout = require('./routs/users');
const articleRout = require('./routs/articles');
const wrongRout = require('./routs/wrongs');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const {
  userBodyValidation,
  userCredentialsBodyValidation,
  validateRequest,
} = require('./helpers/requestValidators');

const { NODE_ENV, DB_URI } = process.env;
const app = express();
app.use(helmet());
mongoose.connect(
  NODE_ENV === 'production' ? DB_URI : 'mongodb://localhost:27017/devdb',
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
const { PORT = 3000 } = process.env;

app.use(express.json());

app.use(requestLogger);

app.use(cors());

app.options('*', cors());

app.use(limiter);

app.post('/signin', validateRequest(userCredentialsBodyValidation), login);

app.post('/signup', validateRequest(userBodyValidation), createUser);

app.use(auth);

app.use(usersRout);

app.use(articleRout);

app.use(wrongRout);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  res
    .status(err.statusCode ? err.statusCode : 500)
    .send({ message: `Caught ${err.name}: ${err.message}` });
});

app.listen(PORT);
console.log(`Listening to port${PORT}`);
