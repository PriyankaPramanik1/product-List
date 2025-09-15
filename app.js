require('dotenv').config();
const express=require('express');
const app=express();
const ejs=require('ejs');




const DbConnection=require('./app/config/dbCon')
DbConnection();

//get data form body

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup ejs
app.set('view engine','ejs');
app.set('views','views')


const userRoute=require("./app/router/userRouter");
app.use(userRoute);

const LookupRoute=require("./app/router/LookupRouter");
app.use(LookupRoute);

const productRoute=require("./app/router/productRouter");
app.use(productRoute);

const PORT=5500;
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})