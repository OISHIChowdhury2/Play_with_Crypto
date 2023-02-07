const { Router }= require('express')
const router = Router();
const {
  authCode,
  // compareAPI
  } = require("./controller");

router.post("/authcode",authCode); 
// router.post("/compareAPI",compareAPI);

module.exports =router;