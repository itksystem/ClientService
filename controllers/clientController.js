const { DateTime }    = require('luxon');
const common       = require('openfsm-common');  /* Библиотека с общими параметрами */
const CommonFunctionHelper = require("openfsm-common-functions")
const commonFunction= new CommonFunctionHelper();
const clientHelper = require('../helpers/ClientHelper');  /* Библиотека с общими параметрами */
const authMiddleware = require('openfsm-middlewares-auth-service');
const logger = require('openfsm-logger-handler');
const { v4: uuidv4 } = require('uuid'); 
const AuthServiceClientHandler = require("openfsm-auth-service-client-handler");
const authClient = new AuthServiceClientHandler();              // интерфейс для  связи с MC AuthService

require('dotenv').config();


const sendResponse = (res, statusCode, data) => {
    if(statusCode >= 400)
         logger.error(data);
    res.status(statusCode).json(data);
};


/*
 @input req/req - 
 @output profile
   200 - создан
   400 - оршибка данных
   422 - ошибка процесса
   500 - серверная ошибка
*/

exports.getProfile = async (req, res) => {          
    try {
        let userId = await authClient.getUserId(req, res);
        if(!userId) throw(401)     
        let profile = await clientHelper.profileFindById(userId);
        if(!profile) profile = {};
        let me = await authClient.me(req, res);        
        profile.login = (me?.data?.login) ? me?.data.login : undefined;
        profile.confirmed = me?.data?.confirmed || undefined;
        sendResponse(res, 200, { status: true,  profile });
       } catch (error) {
        sendResponse(res, (Number(error) || 500), { code: (Number(error) || 500), message:  new CommonFunctionHelper().getDescriptionByCode((Number(error) || 500)) });
    }
};



/*
 @input req/req - 
 @output profile
   200 - создан
   400 - оршибка данных
   422 - ошибка процесса
   500 - серверная ошибка
*/

exports.getProfileById = async (req, res) => {          
    try {
        let userId = await authClient.getUserId(req, res);
        if(!userId) throw(422)     
        let clientId = req.params.clientId;      
        let profile = await clientHelper.profileFindById(clientId);
        if(!profile) profile = {};
        sendResponse(res, 200, { status: true,  profile });
       } catch (error) {
        sendResponse(res, (Number(error) || 500), { code: (Number(error) || 500), message:  new CommonFunctionHelper().getDescriptionByCode((Number(error) || 500)) });
    }
};

/*
 @input body - параметры клиента
 @output result
   200 - создан
   400 - оршибка данных
   422 - ошибка процесса
   500 - серверная ошибка
*/

exports.saveProfile = async (req, res) => {          
    try {
        let userId = await authMiddleware.getUserId(req, res);
        if(!userId) throw(422)
        const { surname,name,patronymic,address,phone  } = req.body;
        const result = await clientHelper.profileUpdateById({ surname,name,patronymic,address,phone,userId });
        if(!result) throw(500)
        let  profile = await clientHelper.profileFindById(userId);
        sendResponse(res, 200, { status: true,  profile });
       } catch (error) {
        sendResponse(res, (Number(error) || 500), { code: (Number(error) || 500), message:  new CommonFunctionHelper().getDescriptionByCode((Number(error) || 500)) });
    }
};


exports.getSubcriptions = async (req, res) => {          
    try {
        let userId = await authMiddleware.getUserId(req, res);
        if(!userId) throw(422)        
        const subscriptions = await clientHelper.getSubcriptions(userId);
        if(!subscriptions) throw(500)        
        sendResponse(res, 200, { status: true,  subscriptions });
       } catch (error) {
        sendResponse(res, (Number(error) || 500), { code: (Number(error) || 500), message:  new CommonFunctionHelper().getDescriptionByCode((Number(error) || 500)) });
    }
};



exports.updateSubcription = async (req, res) => {          
    try {
        
        let userId = await authMiddleware.getUserId(req, res);
        if(!userId) throw(422)
        const {subscriptionId, status } = req.body;
        const result = await clientHelper.updateSubcription(userId, subscriptionId, status);
        if(!result) throw(500)        
        sendResponse(res, 200, { status: true,  subscriptionId });
       } catch (error) {
        sendResponse(res, (Number(error) || 500), { code: (Number(error) || 500), message:  new CommonFunctionHelper().getDescriptionByCode((Number(error) || 500)) });
    }
};

exports.setProfileImage = async (req, res) => {          
    try {
        let userId = await authClient.getUserId(req, res);
        if(!userId) {
          logger.error(userId);
 	  throw(422);               
	}
        let {fileUrls}  = req.body;
        let fileId = uuidv4();
        console.log(fileUrls);
	if(fileUrls?.length > 0) 
  	  await Promise.all( // Асинхронно загружаем медиафайлы для каждого продукта
	    fileUrls.map(async(file) => {
	        try { 
		  console.log(file);
          fileId = uuidv4();
		  let storage  = 'pickmax.profiles';
		  let bucket   = 'local';                
	          let result = await clientHelper.setProfileImage(fileId, file, userId, storage, bucket)
              if(!result) throw('Ошибка записи изображения в профиль')
	        } catch (mediaError) { // Логируем ошибку загрузки медиафайлов, но продолжаем обработку других продуктов          
	          logger.error(`Error fetching media for userId ${userId}: ${mediaError.message}`);
	        }
	      })	
  	   );
        sendResponse(res, 200, { status: true, fileId });	
       } catch (error) {
        console.log(error);
        sendResponse(res, (Number(error) || 500), { code: (Number(error) || 500), message:  new CommonFunctionHelper().getDescriptionByCode((Number(error) || 500)) });
    }
};

exports.deleteProfileImage = async (req, res) => {          
    try {
        let userId = await authClient.getUserId(req, res);
        let fileId = req.params.fileId;
        if(!userId || !fileId ) {
	  console.error(fileId, userId); 
          logger.error(fileId, userId); 
 	  throw(422);               
	}
        let result = await clientHelper.deleteProfileImage(fileId, userId);
        if(!result) throw(403)
        // сохраняем изображения
        sendResponse(res, 200, { status: true });	
       } catch (error) {
        console.log(error);
        sendResponse(res, (Number(error) || 500), { code: (Number(error) || 500), message:  new CommonFunctionHelper().getDescriptionByCode((Number(error) || 500)) });
    }
};

exports.getProfileImage = async (req, res) => {          
    try {
        let userId = await authClient.getUserId(req, res);
        if(!userId) {
          logger.error(userId);
 	  throw(422);               
	}
        const result = await clientHelper.getProfileImage(userId);
        if(!result) throw(500)        
        sendResponse(res, 200, { status: true,  url : result.media_key });
       } catch (error) {
        sendResponse(res, (Number(error) || 500), { code: (Number(error) || 500), message:  new CommonFunctionHelper().getDescriptionByCode((Number(error) || 500)) });
    }
};
