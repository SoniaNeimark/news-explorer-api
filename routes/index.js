const express = require('express');
const usersRout = require('./users');
const articlesRout = require('./articles');
const wrongsRout = require('./wrongs');

const router = express.Router();
router.use(usersRout, articlesRout, wrongsRout);

module.exports = router;
