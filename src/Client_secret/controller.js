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
      var key = base64URLEncode(crypto.randomBytes(16));
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
               console.log(hash);
               console.log("diBQRToexO8vGPwE5DwaZXsZiM5u59bC_2Y0nShWdnI805KU9cQrn4szaCuPgnOR");
    pool.query(queries.loginSQ,[hash],(error)=>{
        if(error) throw error;   
        res.status(201).json({
            message: ' Successfully',
          });
        })
         });
    
      });

};




   
const compareAPI = (req,res) =>{
        const {secret}= req.body;
        pool.query(queries.compare,(error, data)=>{
        // console.log(data.rows[0]);
        const all = (data.rows);
        // console.log("ji",all);
          const found = all.filter(mail => mail.all === secret)
    //  console.log(found);
         bcrypt.compare(req.body.secret,"724d80fddd5eff29ea5e9ef8c8ff4e2819b219e230f1b82ca180337bff8d3afd6ca5ea7da052b3e4", function(err, result) { 
            console.log(result); 
        if(req.body.secret === "724d80fddd5eff29ea5e9ef8c8ff4e2819b219e230f1b82ca180337bff8d3afd6ca5ea7da052b3e4"){
            res.status(200).json({
                message: 'Client Secret match',
            });
        }else{
            res.status(200).json({
                message: 'Client Secret not match',
                    //  data: base64data2,
            });
        }      
    })
     })
    
}

module.exports={
    secret,
   compareAPI,
}