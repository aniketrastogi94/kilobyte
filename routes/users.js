const express=require('express');
const router=express.Router();
const users=require('../models/user');
const {generateToken}=require('../utilis/generateToken');
const {Customer,Admin,auth,delivery_person}=require('../middlewares/authMiddleware');
const sha256=require('sha256');


router.post('/register',async(req,res)=>{
    try {
        const {phoneNumber,password,type}=req.body;
        const user=await users.findOne({phone:phoneNumber});
        if(user){
            return res.status(401).json({
                status:'failure',
                message:'Phone number already excists,please try with different phone number',
                data:null
            })
        }else{
            const use=new users();
            use.phone=phoneNumber;
            use.password=sha256(password);
            use.type=type;
            await use.save();
            return res.status(200).json({
                status:'success',
                message:'user created successfully',
                data:{
                    token:"Bearer " + generateToken(use._id)
                }
            });
        }
    } catch (err) {
        return res.status(401).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
});


router.post('/login',async(req,res)=>{
    try {
        const {phone,password}=req.body;
        const use=await users.findOne({phone:phone});
        if(!use){
            return res.status(402).json({
                status:'failure',
                message:'no such phone number excists',
                data:null
            })
        }else{
            const pas=sha256(password);
            if(use.password===pas){
                return res.status(200).json({
                    status:'success',
                    message:'user successfully authenicated',
                    data:{
                        token:"Bearer " + generateToken(use._id);
                    }
                })
            }else{
                return res.status(402).json({
                    status:'failure',
                    message:'password incorrect',
                    data:null
                })
            }
        }
    } catch (err) {
        return res.status(401).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
})

router.get('/me',auth,async(req,res)=>{
    try {
        return res.status(200).json({
            status:'success',
            message:'User found successfully',
            data:req.user
        })
    } catch (err) {
        return res.status(401).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
})


module.exports={router};