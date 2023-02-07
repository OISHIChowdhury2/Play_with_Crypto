const { Router }= require('express')
const router = Router();
const {
  login,
  compareAPI
  } = require("./controller");

router.post("/", login); 
router.post("/compareAPI", compareAPI);


module.exports =router;