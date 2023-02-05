const { Router }= require('express')
const router = Router();
const {
  login,
  compareAPI
  } = require("./controller");

router.post("/", login); 
router.get("/compareAPI", compareAPI);
// router.get("/:id", getStudentById); 
// router.delete("/:id", removeStudent); 
// router.put("/:id", updateStudent); 

module.exports =router;