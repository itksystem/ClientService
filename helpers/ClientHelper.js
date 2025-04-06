const db = require('openfsm-database-connection-producer');
const ProfileDto = require('../models/ProfileDto');
const logger = require('openfsm-logger-handler');
const SQL        = require('common-client-service').SQL;
const MESSAGES        = require('common-client-service').MESSAGES;
const LANGUAGE = 'RU';

const ClientProducerAMQP  =  require('openfsm-client-producer-amqp'); // ходим в почту через шину
const amqp = require('amqplib');


require('dotenv').config({ path: '.env-client-service' });

   /* найти регионы по id пользователя */
   exports.getClientRegions = async (userId) => {
    const result = await new Promise((resolve, reject) => {
     db.query(SQL.CLIENT.FIND_CLIENT_REGIONS_BY_USER_ID, [userId], (err, result) => {
       if (err) {
         return reject(err);
       }
       resolve(result); // Предполагается, что поле isConfirmed
     });
   });  
  return (result.rows)
 };

 
    /* сохранить регион по fiasId и id пользователя */
    exports.saveClientRegions = async (fiasId, reginName, userId) => {
      const result = await new Promise((resolve, reject) => {
       db.query(SQL.CLIENT.SAVE_CLIENT_REGIONS_BY_USER_ID, [fiasId, reginName, userId], (err, result) => {
         if (err) {
           return reject(err);
         }
         resolve(result); // Предполагается, что поле isConfirmed
       });
     });  
    return (result.rows)
   };
  
    /* удалить регион по fiasId и id пользователя */
    exports.deleteClientRegions = async (fiasId, userId) => {
      const result = await new Promise((resolve, reject) => {
       db.query(SQL.CLIENT.SAVE_CLIENT_REGIONS_BY_USER_ID, [fiasId, userId], (err, result) => {
         if (err) {
           return reject(err);
         }
         resolve(result); // Предполагается, что поле isConfirmed
       });
     });  
    return (result.rows)
   };
  

   /* найти по id пользователя */
   exports.profileFindById = async (userId) => {
     const result = await new Promise((resolve, reject) => {
      db.query(SQL.CLIENT.FIND_PROFILE_BY_ID, [userId], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result); // Предполагается, что поле isConfirmed
      });
    });  
   return (result.rows[0] != undefined ? new ProfileDto(result.rows[0]): null)
  };

  /* найти id пользователя по email*/
     exports.getUserIdByEmail = async (email) => {
      const result = await new Promise((resolve, reject) => {
       db.query(SQL.CLIENT.FIND_USER_ID_BY_EMAIL, [email], (err, result) => {
         if (err) {           
           return reject(err);
         }
         resolve(result); // Предполагается, что поле isConfirmed
       });
     });  
    return (result?.rows?.length > 0 ? Number(result?.rows[0]?.userId) : null)
   };
 
 

   /* найти по id пользователя */
   exports.profileUpdateById = async (user) => {
    const result = await new Promise((resolve, reject) => {
      db.query(SQL.CLIENT.UPDATE_FIO_BY_ID, [
            user.surname,
            user.name,
            user.patronymic,                        
            user.userId], (err, result) => {
        if (err) {          
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
          return reject(err);
        }
        resolve(result); // Предполагается, что поле isConfirmed
      });
     });  
    return (result ? true : false)
  };

// найти  Телефон
exports.checkPhone = async (phone, userId) => {
  const result = await new Promise((resolve, reject) => {
    db.query(SQL.CLIENT.CHECK_PHONE,  [phone, userId], (err, result) => {
      if (err) {        
        return reject(err);
      }
      resolve(result); // Предполагается, что поле isConfirmed
    });
   });  
  return (result.rows)
};

// обновить Телефон
exports.updatePhone = async (phone, userId) => {
  const result = await new Promise((resolve, reject) => {
    db.query(SQL.CLIENT.SAVE_PHONE,  [phone, userId], (err, result) => {
      if (err) {        
        return reject(err);
      }
      resolve(true); // Предполагается, что поле isConfirmed
    });
   });  
  return (result ? true : false)
};

// обновить Email
exports.updateEmail = async (email, userId) => {
  const result = await new Promise((resolve, reject) => {
    db.query(SQL.CLIENT.SAVE_EMAIL,  [email, userId], (err, result) => {
      if (err) {        
        return reject(err);
      }
      resolve(true); // Предполагается, что поле isConfirmed
    });
   });  
  return (result ? true : false)
};

// найти  Email
exports.checkEmail = async (email, userId) => {
  console.log(email, userId)
  const result = await new Promise((resolve, reject) => {
    db.query(SQL.CLIENT.CHECK_EMAIL,  [email, userId], (err, result) => {
      if (err) {        
        console.log(err)
        return reject(err);
      }
      console.log(result)
      resolve(result); // Предполагается, что поле isConfirmed
    });
   });  
  return (result.rows)
};

// обновить telegramId
exports.getUserIdByTelegramId = async (telegramId) => {
  if(!telegramId) return null;
  const result = await new Promise((resolve, reject) => {
    db.query(SQL.CLIENT.GET_TELEGRAM_ID,  [telegramId], (err, result) => {
      if (err) {        
        return reject(err);
      }
      resolve(result); // Предполагается, что поле isConfirmed
    });
   });  
  return (result?.rows[0].userId > 0 ? result?.rows[0].userId : null)
};

// обновить telegramId
exports.getTelegramProfile = async (userId) => {
  if(!userId) return null;
  const result = await new Promise((resolve, reject) => {
    db.query(SQL.CLIENT.GET_TELEGRAM_PROFILE_BY_USER_ID,  [userId], (err, result) => {
      if (err) {        
        return reject(err);
      }
      resolve(result); // Предполагается, что поле isConfirmed
    });
   });  
  return (result?.rows.length > 0 ? result?.rows[0].user : null)
};

// Обновить или создать профиль с telegramId
exports.createProfileByTelegramId = async (userId = null, telegramId = null) => {
   try {
    // Обновление или создание записи с telegramId
    await db.query(SQL.CLIENT.GREATE_TELEGRAM_ID, [userId, telegramId]);
    // Поиск профиля по telegramId
    const result = await db.query(SQL.CLIENT.FIND_PROFILE_TELEGRAM_ID, [telegramId]);
    // Возврат id профиля, если он найден
    return result.rows[0]?.id || null;
  } catch (err) {
    console.error('Error updating or finding profile:', err);
    return null;
  }
};

// Обновить данные telegram пользователя
exports.updateProfileByTelegramId = async (telegramId, user) => {
  try {
    if(!telegramId || !user) return null;
   // Обновление или создание записи с telegramId
   console.log(`updateProfileByTelegramId=>`,telegramId, user)
   const result = await db.query(SQL.CLIENT.UPDATE_TELEGRAM_PROFILE, [telegramId, user]);   
   console.log(`updateProfileByTelegramId.result=>`,result)
   // Возврат id профиля, если он найден
   return result.rows[0] || null;
 } catch (err) {
   console.error('Error updateProfileByTelegramId:', err);
   return null;
 }
};

//{"request_id":"afab9669-8ab0-4187-8c56-854a64f82d3b","user_id":"14","code":49793,"attempts":3,"status":"SUCCESS","created":"2025-03-26T17:18:03.672Z","updated":"2025-03-24T11:33:03.672Z","blocked":"2025-03-24T11:33:03.672Z","confirmation_type":"email","sended":"2025-03-24T15:49:27.489Z"}
const { RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_USER, RABBITMQ_PASSWORD,  RABBITMQ_SMS_CODES_RESULT_SUCCESS_CALLBACK_QUEUE  } = process.env;
const login = RABBITMQ_USER || 'guest';
const pwd = RABBITMQ_PASSWORD || 'guest';
const host = RABBITMQ_HOST || 'rabbitmq-service';
const port = RABBITMQ_PORT || '5672';

const SMS_CODES_RESULT_SUCCESS_CALLBACK= RABBITMQ_SMS_CODES_RESULT_SUCCESS_CALLBACK_QUEUE  || 'SMS_CODES_RESULT_SUCCESS_CALLBACK';


async function startConsumer(queue, handler) {
  try {
      const connection = await amqp.connect(`amqp://${login}:${pwd}@${host}:${port}`);
      const channel = await connection.createChannel();
      await channel.assertQueue(queue, { durable: true });
      console.log(`Listening on queue ${queue}...`);
      channel.consume(queue, async (msg) => {
          if (msg) {
              try {
                  const data = JSON.parse(msg.content.toString());
                  await handler(data);
                  channel.ack(msg);
              } catch (error) {
                  console.error(`Error processing message: ${error}`);
              }
          }
      });
  } catch (error) {
      console.error(`Error connecting to RabbitMQ: ${error}`);
  }
}

async function emailConfirmUpdate(msg = null) { 
  if(!msg) return null;
  return new Promise((resolve, reject) => {  
        db.query( SQL.CLIENT.UPDATE_PROFILE_EMAIL_CONFIRM,
          [msg.user_id, msg.confirmation_type, msg.status],
          (err, results) => {
            if (err) {
              console.log(err); 
              return reject(null);
            }
            resolve(results.rows[0]);
        }
     );
  });
};

async function phoneConfirmUpdate(msg = null) { 
  if(!msg) return null;
  return new Promise((resolve, reject) => {  
        db.query( SQL.CLIENT.UPDATE_PROFILE_PHONE_CONFIRM,
          [msg.user_id, msg.confirmation_type, msg.status],
          (err, results) => {
            if (err) {
              console.log(err); 
              return reject(null);
            }
            resolve(results.rows[0]);
        }
     );
  });
};

// чтение результата отправки кода смс
startConsumer(SMS_CODES_RESULT_SUCCESS_CALLBACK, async (msg) => { 
  try {
    console.log(msg);  
    switch(msg.confirmation_type){
      case 'email' : { await emailConfirmUpdate(msg); return; }
      case 'phone' : { await phoneConfirmUpdate(msg); return; }

    }    
  } catch (error) {
    console.log(error); 
  }
});

