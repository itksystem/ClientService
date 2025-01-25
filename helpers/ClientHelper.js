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
