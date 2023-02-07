const { query } = require('express');
const { is } = require('type-is');
const pool =require('../../db');
const crypto = require ("crypto");
const queries = require("./querry");

const login= (req, res)=>{
    const {email}= req.body;
    const algorithm = "aes-256-cbc"; 
    const initVector = crypto.randomBytes(16) ;
    const Securitykey = crypto.randomBytes(32);
    const hashEmain = crypto.createHash('md5').update(email).digest('hex');
    // console.log(hashEmain);
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(hashEmain,"utf-8", "hex");
    encryptedData += cipher.final("hex");
    let buff = new  Buffer.from(encryptedData);
    let maintext = buff.toString('base64');
    let base64data = maintext.substring(50,82);
    console.log("Encrypted message: " + base64data);
    pool.query(queries.loginSQ, [base64data],(error)=>{
        if(error) throw error;   
        if(base64data === base64data){
        res.status(201).json({
            message: ' Successfully Registed',
             data: base64data,
          });
        }
        })
    
};

const compareAPI = (req,res) =>{
    const {email}= req.body;
    pool.query(queries.compare,(error, data)=>{
    // console.log(data.rows[0]);
    const all = (data.rows);
    const found = all.filter(mail => mail.email === email)
    if(found.length > 0){
        res.status(200).json({
            message: 'Client Id match',
        });
    }else{
        res.status(200).json({
            message: 'Client Id not match',
                //  data: base64data2,
        });
    }      
})
}
module.exports={
    login,
    compareAPI,
}