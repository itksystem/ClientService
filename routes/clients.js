const express = require('express');
const router = express.Router();
const common = require("openfsm-common"); // Библиотека с общими параметрами
const { getProfile, saveProfile, getProfileById, getSubcriptions, updateSubcription, getProfileImage, setProfileImage, deleteProfileImage  } = require('../controllers/clientController');
const authMiddleware = require('openfsm-middlewares-auth-service');

router.get('/v1/profile', authMiddleware.authenticateToken, getProfile);  // получить профиль
router.post('/v1/profile', authMiddleware.authenticateToken, saveProfile);  // сохранить профиль
router.get('/v1/client/:clientId', authMiddleware.authenticateToken, getProfileById );  // получить профиль по Id
router.get('/v1/profile-image', authMiddleware.authenticateToken, getProfileImage );  // установить фото профиля
router.post('/v1/profile-image', authMiddleware.authenticateToken, setProfileImage );  // установить фото профиля
router.delete('/v1/profile-image', authMiddleware.authenticateToken, deleteProfileImage );  // удалить фото профиля
router.get('/v1/subscriptions', authMiddleware.authenticateToken, getSubcriptions);  // получить подписки
router.patch('/v1/subscription', authMiddleware.authenticateToken, updateSubcription );  // обновить подписки

module.exports = router;
