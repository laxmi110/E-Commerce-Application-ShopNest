const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")
const sendEmail=require("../utils/sendEmail")
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn :'7d'} )
}
//register a new user 
const registerUser=async(req,res)=>{
   const {name,email,password}=req.body;
   try{
    const existingUser= await User.findOne({email})
    if(existingUser) {
        return res.status(400).json({message:'user already exists'});
    }
    // hashing the password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const user=await User.create({name, email, password: hashedPassword});

    if(user){
        const otp=Math.floor(100000+Math.random()*900000).toString();
        const message=`your shopnest otp is ${otp}`;
        sendEmail(email, 'Welcome to Shopnest- your otp for Registration',message)
            .catch(err => console.error('Email send failed:', err.message));
        return res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id),
        });

    } else {
        return res.status(400).json({
            message:'Invalid user registration'
        })
    }
   }
   catch(error){
    console.error('RegisterUser error:', error);
    return res.status(500).json({
        message:'error in registration',
        error: error.message,
    })
   }
}

//LOGIN USER

const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token:generateToken(user._id)
            });
        } else{
            res.status(400).json({
                message:"invalid email or password"
            })
        }
    }catch(error){
        res.status(500).json({
            message:'server error'
        })
    }
}

//getuser
 const getusers=async(req,res)=>{
    try{
        const users=await User.find({}).select('-password')
        res.json(users)
    }
    catch(error){
        res.status(500).json({
            message:'server error'
        })
    }

 }

 module.exports={registerUser, loginUser, getusers}