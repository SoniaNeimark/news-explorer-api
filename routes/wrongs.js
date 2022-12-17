const express = require('express');

const router = express.Router();

const { NotFoundError, notFound } = require('../errors');

const throwErr = () => {
  throw new NotFoundError(notFound);
};

/*router.get('*', throwErr);
router.post('*', throwErr);
router.patch('*', throwErr);
router.put('*', throwErr);
router.delete('*', throwErr);*/
router.all('*', throwErr);

module.exports = router;
