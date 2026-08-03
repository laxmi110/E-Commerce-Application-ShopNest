const mongoose=require("mongoose")
async function connectDB(){
    
       const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connectes successfully`);
    
    
}

module.exports=connectDB