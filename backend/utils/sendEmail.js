const nodemailer=require("nodemailer")
//MONGO_URI=mongodb+srv://mernstack:0QIWxUkKxbcm7yK7@backend.axffv5m.mongodb.net/?appName=backend/shopnest
const sendEmail=async(to,subject,text)=>{
    try{
        const transporter=nodemailer.createTransport({
            service:'Gmail',
            auth:{
                user:process.env.GMAIL_USER,
                pass:process.env.GMAIL_PASS
            }
        });
        const mailOption={
            from:process.env.GMAIL_USER,
            to,
            subject,
            text,
        }
        await transporter.sendMail(mailOption);
    }
    catch (error) {
        console.error(`Failed to send email to ${to}: ${error.message}`);
    }
}

module.exports = sendEmail