const express = require('express');
const router = express.Router();
const common = require("openfsm-common"); // Библиотека с общими параметрами
const { 
    getProfile, saveProfile, getProfileById, 
    getSubcriptions, updateSubcription, getProfileImage, 
    setProfileImage, deleteProfileImage, checkPhone, savePhone, checkEmail, saveEmail, getUserIdByEmail,
    getUserIdByTelegramId, createProfileByTelegramId,updateProfileByTelegramId,getTelegramProfile,getClientRegions, saveClientRegion, deleteClientRegion
  } = require('../controllers/clientController');
const authMiddleware = require('openfsm-middlewares-auth-service');

router.get('/v1/regions', authMiddleware.authenticateToken, getClientRegions);  // получить список регионов
router.post('/v1/region', authMiddleware.authenticateToken, saveClientRegion);  // сохранить регион
router.delete('/v1/region', authMiddleware.authenticateToken, deleteClientRegion);  // удалить регион

router.get('/v1/profile', authMiddleware.authenticateToken, getProfile);  // получить профиль
router.post('/v1/profile', authMiddleware.authenticateToken, saveProfile);  // сохранить профиль

router.post('/v1/email-check', authMiddleware.authenticateToken, checkEmail);  // сохранить в профиль email
router.post('/v1/email', authMiddleware.authenticateToken, saveEmail);  // сохранить в профиль email

router.post('/v1/phone-check', authMiddleware.authenticateToken, checkPhone);  // проверить телефон перед записью
router.post('/v1/phone', authMiddleware.authenticateToken, savePhone);  // сохранить в профиль телефон

router.get('/v1/telegram-profile/:id', getTelegramProfile);  // получить userId  по  telegramId
router.post('/v1/telegram-id', getUserIdByTelegramId);  // получить userId  по  telegramId
router.post('/v1/telegram-create', createProfileByTelegramId);  // создать в профиль по  telegramId
router.post('/v1/telegram-update', updateProfileByTelegramId);  // создать в профиль по  telegramId

router.post('/v1/user-id',  getUserIdByEmail);  // получить



router.get('/v1/client/:clientId', authMiddleware.authenticateToken, getProfileById );  // получить профиль по Id
router.get('/v1/profile-image', authMiddleware.authenticateToken, getProfileImage );  // установить фото профиля
router.post('/v1/profile-image', authMiddleware.authenticateToken, setProfileImage );  // установить фото профиля
router.delete('/v1/profile-image', authMiddleware.authenticateToken, deleteProfileImage );  // удалить фото профиля
router.get('/v1/subscriptions', authMiddleware.authenticateToken, getSubcriptions);  // получить подписки
router.patch('/v1/subscription', authMiddleware.authenticateToken, updateSubcription );  // обновить подписки

module.exports = router;
