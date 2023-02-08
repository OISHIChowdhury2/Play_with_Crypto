const { query } = require('express');
const { is } = require('type-is');
const pool =require('../../db');
const crypto = require ("crypto");
const queries = require("./querry");
const { createHash } = require("crypto")
const {  publicEncrypt } = require('crypto');
const { generateKeyPairSync } = require('crypto');
const bcrypt = require ('bcrypt');
// const { privateKey, publicKey } = generateKeyPairSync('rsa', {
//   modulusLength: 2048, 
//   publicKeyEncoding: {
//     type: 'spki', 
//     format: 'pem',
//   },
//   privateKeyEncoding: {
//     type: 'pkcs8', 
//     format: 'pem',
//   },
// });
// console.log(publicKey);
// console.log(privateKey);

const secret= (req, res)=>{
    function base64URLEncode(str) {
        return str
          .toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
      }
    
      const saltRounds = 10;
      var password = base64URLEncode(crypto.randomBytes(32));

      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
               console.log(hash);
            //    console.log("diBQRToexO8vGPwE5DwaZXsZiM5u59bC_2Y0nShWdnI805KU9cQrn4szaCuPgnOR");
    // pool.query(queries.loginSQ,[hash],(error)=>{
    //     if(error) throw error;   
    //     res.status(201).json({
    //         message: ' Successfully',
    //       });
    //     })
         });
    
      });


bcrypt.compare(password,password , function(err, res) {
    if(password != password){
     
      
                 console.log('not match'); 
                 
    } else {
      // Send JWT
      console.log('match'); 
    }
  });

  
    

};
module.exports={
    secret,

}