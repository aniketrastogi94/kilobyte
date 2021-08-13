const jwt=require('jsonwebtoken');
const users=require('../models/users');
const asyncHandler=require('express-async-handler');

const Admin = asyncHandler(async (req, res, next) => {
  let token;
  //console.log(req.headers);
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      //console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      //console.log(decoded);
      req.user = await users.findById(decoded.id).select('-password');
      if(req.user && req.user.type==="admin"){
        next();
      }else{
        return res.status(403).json({
          status:'failure',
          message:'you are trying to access things that does not come into your type,please specify your type first',
          data:{
            token:null
          }
        });
      }
    } catch (error) {
      //console.log(error);
      return res.status(401).json({
        status:'Failure',
        message:'You are not authorized,please login again',
        data:{
          token:null
        }
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      status:'Failure',
        message:'You are not authorized,please login again',
        data:{
          token:null
        }
    });
  }
})

const Customer=asyncHandler(async(req,res,next)=>{
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await users.findById(decoded.id)
      if(req.user && req.user.type==="customer"){
        next();
      }else{
        //console.log(req.user);
        return res.status(403).json({
          status:'failure',
          message:'you are trying to access things that does not come into your type,please specify your type first',
          data:{
            token:null
          }
        })
      }
    } catch (error) {
      //console.log(error);
      return res.status(401).json({
        status:'Failure',
        message:'You are not authorized,please login again',
        data:{
          token:null
        }
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      status:'Failure',
      message:'You are not authorized,please login again',
      data:{
        token:null
      }
    });
  }
});

const auth=asyncHandler(async(req,res,next)=>{
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      //console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      //console.log(decoded);
      req.user = await users.findById(decoded.id).select('-password_hash')
      //console.log(req.user);
      if(req.user){
        next();
      }else{
        return res.status(400).json({
          status:'failure',
          message:'Not a valid customer any more',
          data:null
        })
      }
      
    } catch (error) {
      //console.log(error);
      return res.status(401).json({
        status:'Failure',
        message:'You are not authorized,please login again',
        data:{
          token:null
        }
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      status:'Failure',
      message:'You are not authorized,please login again',
      data:{
        token:null
      }
    });
  }
});


const delivery_person=asyncHandler(async(req,res,next)=>{
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await users.findById(decoded.id)
      if(req.user && req.user.type==="delivery_person"){
        next();
      }else{
        //console.log(req.user);
        return res.status(403).json({
          status:'failure',
          message:'you are trying to access things that does not come into your type,please specify your type first',
          data:{
            token:null
          }
        })
      }
    } catch (error) {
      //console.log(error);
      return res.status(401).json({
        status:'Failure',
        message:'You are not authorized,please login again',
        data:{
          token:null
        }
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      status:'Failure',
      message:'You are not authorized,please login again',
      data:{
        token:null
      }
    });
  }
});

module.exports={Customer,Admin,auth,delivery_person};



