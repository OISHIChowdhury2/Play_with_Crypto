const { Router }= require('express')
const router = Router();
const {
    secret,
  // compareAPI,
  } = require("./controller");

router.post("/secret",secret); 
// router.get("/compareAPI", compareAPI);

module.exports =router;