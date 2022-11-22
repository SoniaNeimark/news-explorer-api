const express = require('express');
const { ownerProfile } = require('../paths/paths');
const { getCurrentUser } = require('../controllers/users');

const router = express.Router();

router.get(ownerProfile, getCurrentUser);

module.exports = router;
