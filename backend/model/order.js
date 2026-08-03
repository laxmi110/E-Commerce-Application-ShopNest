const mongoose=require("mongoose")
const orderSchema=new mongoose.Schema({
    user:{ type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    products:[{
        product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
        quantity:{type:Number,required:true, min:1}   
    }],
    totalAmount:{type:Number,required:true}, 
    address:{
        fullName:{type:String,required:true},
        street:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,required:true}
    },
    // optional payment identifier (from payment gateway)
    paymentId:{type:String},
    paymentMethod:{type:String, enum:['COD','Online'], default:'COD'},
    paymentStatus:{type:String, enum:['pending','paid','failed'], default:'pending'},
    // order status
    orderStatus:{type:String, enum:['pending','shipped','delivered'], default:'pending'}
},{ timestamps:true});

module.exports=mongoose.model("Order",orderSchema)