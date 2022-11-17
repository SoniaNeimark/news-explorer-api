const express = require('express');

const router = express.Router();

const { NotFoundError } = require('../helpers/errors');

const throwErr = () => {
  throw NotFoundError;
};

router.get('*', throwErr);
router.post('*', throwErr);
router.patch('*', throwErr);
router.put('*', throwErr);
router.delete('*', throwErr);

module.exports = router;
