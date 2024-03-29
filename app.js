const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
//const cors = require('cors');

const { port, dbUri } = require('./helpers/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { validateUserRegister, validateUserLogin } = require('./models/user');
const { validate } = require('./middlewares/validate');
const router = require('./routes');
const limiter = require('./helpers/limiter');

const app = express();

app.use(helmet());

mongoose.connect(dbUri);

app.use(express.json());

app.use(requestLogger);

//app.use(cors({ origin: '*' }));

app.use(limiter);

app.post('/signin', validate(validateUserLogin), login);

app.post('/signup', validate(validateUserRegister), createUser);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use((err, req, res, next) => {
  res
    .status(err.statusCode ? err.statusCode : 500)
    .send({ message: `Caught ${err.name}: ${err.message}` });
});

app.listen(port);
console.log(`Listening to port${port}`);
