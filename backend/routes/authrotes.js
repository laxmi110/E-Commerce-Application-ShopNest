const express=require("express")
const router= express.Router()
const {registerUser,loginUser,getusers}= require("../controller/authController")
const {protect}=require("../middleware/authmiddleware")
const {admin}=require("../middleware/adminMiddleware")

router.post("/register", registerUser)
router.post("/login",loginUser)
router.get("/user",protect,admin,getusers)

module.exports = router