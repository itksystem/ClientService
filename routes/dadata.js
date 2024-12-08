const express = require('express');
const router = express.Router();
const common = require("openfsm-common"); // Библиотека с общими параметрами
const {getSuggestAddress}  = require('../controllers/dadataController');
const authMiddleware = require('openfsm-middlewares-auth-service');

router.get('/v1/suggest/address', authMiddleware.authenticateToken, getSuggestAddress);  // получить профиль

module.exports = router;
