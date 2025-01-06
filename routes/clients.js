const express = require('express');
const router = express.Router();
const common = require("openfsm-common"); // Библиотека с общими параметрами
const { getProfile, saveProfile, getProfileById  } = require('../controllers/clientController');
const authMiddleware = require('openfsm-middlewares-auth-service');

router.get('/v1/profile', authMiddleware.authenticateToken, getProfile);  // получить профиль
router.get('/v1/client/:clientId', authMiddleware.authenticateToken, getProfileById );  // получить профиль по Id

router.post('/v1/profile', authMiddleware.authenticateToken, saveProfile);  // созранить профиль
module.exports = router;
