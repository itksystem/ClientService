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

require('dotenv').config();


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
        const apiKey = process.env.DADATA_API_KEY || "bc9d9254dea2089592ccee5328f19ce9d004a43c"; // Используем переменные окружения
        const url = process.env.DADATA_SUGGEST_ADDRESS_URL || "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";

        const response = await axios.post(
            url,
            { query }, // Тело запроса
                {
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Token ${apiKey}`
                }
            }
        );

        const suggestions = response?.data?.suggestions      
            .filter(item => [4, 5, 6, 7, 8, 9].includes(parseInt(item.data.fias_level)))
            .map(item => ({
                value: item.value,
                fiasId: item.data.fias_id,
                fiasLevel: item.data.fias_level,
                address : {
                postalCode : item.data.postal_code,
                country : item.data.country,
                region : item.data.region,
                city : item.data.city,
                street : item.data.street,
                house : item.data.house,
                block : item.data.block,
                flat : item.data.flat
              }         
        }));

        sendResponse(res, 200, { status: true,  data: suggestions });
        
    } catch (error) {
        console.error("Error:", error.message);
        sendResponse(res, (Number(error) || 500), { code: (Number(error) || 500), message:  new CommonFunctionHelper().getDescriptionByCode((Number(error) || 500)) });
    }
};

