const db = require('openfsm-database-connection-producer');
const ProfileDto = require('../models/ProfileDto');
require('dotenv').config();

   /* найти по id пользователя */
   exports.profileFindById = (userId) => {
    return new Promise((resolve, reject) => {      
      db.query('SELECT * FROM profile  WHERE user_id = ?', [userId], (err, result) => {
        (err)
        ? reject(err)
        : resolve(result[0] != undefined ? new ProfileDto(result[0]): null);
      });
    });
  };


   /* найти по id пользователя */
   exports.profileUpdateById = (user) => {
    return new Promise((resolve, reject) => {      
      db.query(`
        INSERT INTO profile (surname, name, patronymic, address, phone, user_id) VALUES (?,?,?,?,?,?)
        ON DUPLICATE KEY 
        UPDATE 
        surname = ?,
        name = ?,
        patronymic = ?,
        address = ?,
        phone = ?`, [
            user.surname,
            user.name,
            user.patronymic,
            user.address,
            user.phone,
            user.userId,

            user.surname,
            user.name,
            user.patronymic,
            user.address,
            user.phone,            
        ], (err, result) => {
        (err)
        ? reject(false)
        : resolve(true);
      });
    });
  };
