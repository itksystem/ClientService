const db = require('openfsm-database-connection-producer');
const ProfileDto = require('../models/ProfileDto');
const logger = require('openfsm-logger-handler');
const SQL        = require('common-client-service').SQL;
const MESSAGES        = require('common-client-service').MESSAGES;
const LANGUAGE = 'RU';


require('dotenv').config();

   /* найти по id пользователя */
   exports.profileFindById = async (userId) => {
     const result = await new Promise((resolve, reject) => {
      db.query(SQL.CLIENT.FIND_PROFILE_BY_ID, [userId], (err, result) => {
        if (err) {
          logger.error(err);
          return reject(err);
        }
        resolve(result); // Предполагается, что поле isConfirmed
      });
    });  
   return (result.rows[0] != undefined ? new ProfileDto(result.rows[0]): null)
  };


   /* найти по id пользователя */
   exports.profileUpdateById = async (user) => {
    const result = await new Promise((resolve, reject) => {
      db.query(SQL.CLIENT.UPDATE_PROFILE_BY_ID, [
            user.surname,
            user.name,
            user.patronymic,
            user.address,
            user.phone,
            user.userId], (err, result) => {
        if (err) {
          logger.error(err);
          return reject(err);
        }
        resolve(result); // Предполагается, что поле isConfirmed
      });
    });  
   return (result ? true : false)   
  };

     /* найти подписки пользователя */
     exports.getSubcriptions = async (userId) => {
      const result = await new Promise((resolve, reject) => {
        db.query(SQL.CLIENT.FIND_SUBSCRIPTIONS_BY_USER_ID, [userId], (err, result) => {
          if (err) {
            logger.error(err);
            return reject(err);
          }
          resolve(result); // Предполагается, что поле isConfirmed
        });
      });  
     return (result?.rows ? result?.rows: null)   
    };
  
    /* удалить/установить подписку пользователя */
    exports.updateSubcription = async (userId, subscriptionId, status) => {
      const result = await new Promise((resolve, reject) => {
        db.query(SQL.CLIENT.UPDATE_SUBSCRIPTION_BY_USER_ID, [userId, subscriptionId, status], (err, result) => {
          if (err) {
            logger.error(err);
            return reject(err);
          }
          resolve(result); // Предполагается, что поле isConfirmed
        });
      });  
     return (result?.rows ? result?.rows[0].subscription_id: null)   
    };


// установить фото    file.fileId, file.url, userId, storage, bucket
  exports.setProfileImage = async (mediaId, mediaKey, userId, storage, bucket) => {
    const result = await new Promise((resolve, reject) => {
      db.query(SQL.CLIENT.SET_PROFILE_IMAGE, [mediaId, mediaKey, userId, storage, bucket], (err, result) => {
        if (err) {
          logger.error(err);
          return reject(err);
        }
        resolve(result); // Предполагается, что поле isConfirmed
      });
     });  
    return (result ? true : false)
  };

// получить фото  
  exports.getProfileImage = async (userId) => {
    const result = await new Promise((resolve, reject) => {
      db.query(SQL.CLIENT.GET_PROFILE_IMAGE, [userId], (err, result) => {
        if (err) {
          logger.error(err);
          return reject(err);
        }
        resolve(result?.rows[0]); // Предполагается, что поле isConfirmed
      });
     });  
    return (result)
  };


// удалить фото
  exports.deleteProfileImage = async (fileId, userId) => {
    const result = await new Promise((resolve, reject) => {
      db.query(SQL.CLIENT.DELETE_PROFILE_IMAGE,  [fileId, userId], (err, result) => {
        if (err) {
          logger.error(err);
          return reject(err);
        }
        resolve(result); // Предполагается, что поле isConfirmed
      });
     });  
    return (result ? true : false)
  };

    