const express = require('express');
const router = express.Router();
const common = require("openfsm-common"); // Библиотека с общими параметрами
const {getSuggestAddress, getCdekFilials, getRussianPostUnits, getRussianPostUnitsViaGeolocal}  = require('../controllers/dadataController');
const authMiddleware = require('openfsm-middlewares-auth-service');

router.get('/v1/suggest/address', authMiddleware.authenticateToken, getSuggestAddress);  // получить профиль
router.get('/v1/suggest/russian-postal-units', authMiddleware.authenticateToken, getRussianPostUnits);  // получить список почтовый отделений России
router.get('/v1/geolocate/russian-postal-units', authMiddleware.authenticateToken, getRussianPostUnitsViaGeolocal);  // получить список почтовый отделений России ,ближайших к локации]
router.get('/v1/suggest/cdek-filials', authMiddleware.authenticateToken, getCdekFilials);  // получить список филиалов CDEK

module.exports = router;
