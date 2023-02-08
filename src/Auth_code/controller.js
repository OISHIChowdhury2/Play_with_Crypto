const { query } = require('express');
const { is } = require('type-is');
const pool =require('../../db');
const crypto = require ("crypto");
const queries = require("./querry");
const { createHash } = require("crypto")
const {  publicEncrypt } = require('crypto');
const { generateKeyPairSync } = require('crypto');
const { createSign, createVerify } = require('crypto');
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048, 
  publicKeyEncoding: {
    type: 'spki', 
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8', 
    format: 'pem',
  },
});
console.log(publicKey);
console.log(privateKey);

const authCode= (req, res)=>{
    function base64URLEncode(str) {
        return str
          .toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
      }
    const password = base64URLEncode(crypto.randomBytes(16));
    const salt = base64URLEncode(crypto.randomBytes(32));
    const passhash = createHash("sha256")
      .update(password)
      .update(createHash("sha256").update(salt, "utf8").digest("hex"))
      .digest("hex")
    const encryptedData = publicEncrypt(
        publicKey,
        Buffer.from(passhash)
      );

    const main = encryptedData.toString('hex');

 console.log(main);
    pool.query(queries.loginSQ,[main],(error)=>{
        if(error) throw error;   
        res.status(201).json({
            message: ' Successfully',
          });
        })
    


/// SIGN
const signer = createSign('rsa-sha256');
signer.update(main);
const siguature = signer.sign(privateKey, 'hex');
console.log(siguature);
/// VERIFY
const verifier = createVerify('rsa-sha256');
verifier.update(main);
const isVerified = verifier.verify(publicKey, siguature, 'hex');
console.log(isVerified);      
    }



module.exports={
    authCode,

}