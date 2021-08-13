const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const product=mongoose.model('product',productSchema);
export default product;