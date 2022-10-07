const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password = require('../middleware/password');
const rateLimit= require('../middleware/rate-limit');


// route utilisée pour chaques requêtes avec middleware executé de gauche à droite
router.post('/signup', password, userCtrl.signup);
router.post('/login', rateLimit.limiter, userCtrl.login);

module.exports = router;