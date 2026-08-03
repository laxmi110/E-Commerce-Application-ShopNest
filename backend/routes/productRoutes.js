const express=require("express")
const {getProduct,getProductById,createProduct,updateProduct,deleteProduct}=require("../controller/productController")
const router=express.Router();
const {protect}=require("../middleware/authmiddleware")
const {admin}=require("../middleware/adminMiddleware")
const multer=require("multer")
const upload=multer({dest:"uploads/"})


//both get and post request
//all product
router.route('/').get(getProduct).post(protect,admin,upload.single('image'), createProduct)

//specific product 
router.route('/:id').get(getProductById).put(protect,admin,upload.single('image'), updateProduct).delete(protect,admin,deleteProduct);
module.exports = router