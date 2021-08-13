const mongooose=require('mongoose');

const userSchema=mongooose.Schema({
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        default:"Customer"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const user=mongooose.model('User',userSchema);
module.exports=user;