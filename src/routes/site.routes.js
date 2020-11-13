const express = require('express');
const router = express.Router();
const SiteController = require('../controllers/site.controller');

router.post('/sign_in', SiteController.signIn);
router.post('/sign_up', SiteController.signUp);

module.exports = router;