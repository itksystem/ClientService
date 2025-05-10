const common       = require('openfsm-common');  /* Библиотека с общими параметрами */
const CommonFunctionHelper = require("openfsm-common-functions")
const commonFunction= new CommonFunctionHelper();
const clientHelper = require('../helpers/ClientHelper');  /* Библиотека с общими параметрами */
const authMiddleware = require('openfsm-middlewares-auth-service');
const logger = require('openfsm-logger-handler');
const { v4: uuidv4 } = require('uuid'); 
const AuthServiceClientHandler = require("openfsm-auth-service-client-handler");
const authClient = new AuthServiceClientHandler();              // интерфейс для  связи с MC AuthService
const axios = require('axios'); // Импорт библиотеки axios

require('dotenv').config({ path: '.env-client-service' });

const DADATA_API_KEY = process.env.DADATA_API_KEY || "bc9d9254dea2089592ccee5328f19ce9d004a43c"; // Используем переменные окружения
const DADATA_SUGGEST_ADDRESS_URL = process.env.DADATA_SUGGEST_ADDRESS_URL || "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
const DADATA_RUSSIAN_POST_UNIT_URL = process.env.DADATA_RUSSIAN_POST_UNIT_URL || "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/postal_unit";
const DADATA_CDEK_DELIVERY_UNIT_URL = process.env.DADATA_CDEK_DELIVERY_UNIT_URL || "http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/delivery";


const sendResponse = (res, statusCode, data) => {
    if(statusCode >= 400)
         logger.error(data);
    res.status(statusCode).json(data);
};


/* Дадата */
exports.getSuggestAddress = async (req, res) => {          
    const query = req.query.query;
    // Проверка наличия query
    if (!query) {
        return res.status(400).json({
            status: false,
            message: "Query parameter is required."
        });
    }

    try {
        const response = await axios.post(
            DADATA_SUGGEST_ADDRESS_URL,
            { query }, // Тело запроса
                {
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Token ${DADATA_API_KEY}`
                }
            }
        );

        const suggestions = response?.data?.suggestions      
            .filter(item => [4, 5, 6, 7, 8, 9].includes(parseInt(item.data.fias_level)))
            .slice(0, 5) // Ограничиваем вывод 5 элементами
            .map(item => ({
                value: item.value,
                fiasId: item.data.fias_id,
                fiasLevel: item.data.fias_level,
                postalCode : item.data.postal_code,
                latitude : item.data.geo_lat,
                longitude : item.data.geo_lon,
                country : item.data.country,
                region : item.data.region,
                city : item.data.city,
                street : item.data.street,
                house : item.data.house,
                block : item.data.block,
                flat : item.data.flat
        }));

        sendResponse(res, 200, { status: true,  data: suggestions });
        
    } catch (error) {
        console.error("Error:", error.message);
        sendResponse(res, (Number(error) || 500), { code: (Number(error) || 500), message:  new CommonFunctionHelper().getDescriptionByCode((Number(error) || 500)) });
    }
};


/* Почтовые отделения */
exports.getRussianPostUnits = async (req, res) => {          
    const query = req.query.query;
    // Проверка наличия query
    if (!query) {
        return res.status(400).json({
            status: false,
            message: "Query parameter is required."
        });
    }

    try {
        const response = await axios.post(
            DADATA_RUSSIAN_POST_UNIT_URL,
            { query }, // Тело запроса
                {
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Token ${DADATA_API_KEY}`
                }
            }
        );

        const suggestions = response?.data?.suggestions
        .slice(0, 5) // Ограничиваем вывод 5 элементами
        .map(item => ({
                   "value" : item.unrestricted_value,
                   "postalСode": item.data.postal_code,
                   "isClosed": item.data.is_closed,
                   "typeCode": item.data.type_code,
                   "addressStr": item.data.address_str,
                   "kladrId": item.data.address_kladr_id,
                   "qc": item.data.address_qc,
                   "geoLat": item.data.geo_lat,
                   "geoLon": item.data.geo_lon,
                   "schedule" : {
                   "Mon": item.data.schedule_mon ?? `не работает`,
                   "Tue": item.data.schedule_tue ?? `не работает`,
                   "Wed": item.data.schedule_wed ?? `не работает`,
                   "Thu": item.data.schedule_thu ?? `не работает`,
                   "Fri": item.data.schedule_fri ?? `не работает`,
                   "Sat": item.data.schedule_sat ?? `не работает`,
                   "Sun": item.data.schedule_sun ?? `не работает`
                   }
    }));
        sendResponse(res, 200, { status: true,  data: suggestions })        
    } catch (error) {
        console.error("Error:", error.message);
        sendResponse(res, (Number(error) || 500), { code: (Number(error) || 500), message:  new CommonFunctionHelper().getDescriptionByCode((Number(error) || 500)) });
    }
};


exports.getCdekFilials = async (req, res) => {          
    const query = req.query.query;
    // Проверка наличия query
    if (!query) {
        return res.status(400).json({
            status: false,
            message: "Query parameter is required."
        });
    }

    try {
        const response = await axios.post(
            DADATA_CDEK_DELIVERY_UNIT_URL,
            { query }, // Тело запроса
                {
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Token ${DADATA_API_KEY}`
                }
            }
        );

        const suggestions = response?.data?.suggestions;
        sendResponse(res, 200, { status: true,  data: suggestions });
        
    } catch (error) {
        console.error("Error:", error.message);
        sendResponse(res, (Number(error) || 500), { code: (Number(error) || 500), message:  new CommonFunctionHelper().getDescriptionByCode((Number(error) || 500)) });
    }
};

