const { Router }= require('express')
const router = Router();
const {
  login,
  compareAPI
  } = require("./controller");

router.post("/", login); 
router.get("/compareAPI", compareAPI);


module.exports =router;