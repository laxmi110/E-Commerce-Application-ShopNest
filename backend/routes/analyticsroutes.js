const express = require('express');
const { getAdminStats } = require('../controller/analyticalController');
const { protect } = require('../middleware/authmiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', getAdminStats);

module.exports = router;
