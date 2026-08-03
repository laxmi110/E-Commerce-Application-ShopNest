const express=require("express")
const router=express.Router();  
const {protect}=require("../middleware/authmiddleware")
const {admin}=require("../middleware/adminMiddleware")
const {createOrder,getMyOrders,getOrders,updateOrderStatus}=require("../controller/orderController")

router.route('/').post(protect,createOrder).get(protect, admin, getOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id/status').put(protect, admin, updateOrderStatus)


module.exports = router
