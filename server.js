const express=require('express');
const bodyParser=require('body-parser');
var cors=require('cors');
const colors=require('colors');
const dotenv=require('dotenv');
dotenv.config();
const app=express();
const connectDB =require('./config/db');
connectDB();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
const port=process.env.PORT || 5000;
app.listen(port,console.log(`SERVER running successfully on port ${port} `));