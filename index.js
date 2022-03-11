 
 
  // create shoping api
//  const { error } = require("console");
 const express = require("express")
 const dotenv =  require("dotenv");
 const app = express();
 const bodyperser =  require("body-parser")
 dotenv.config();
 const userrouter = require("./routers/user");
 const authetication = require('./routers/authetication');
 const Product = require("./routers/product");
 const cartProduct = require("./routers/cart");
 const userorder = require("./routers/order");
 const payment = require("./routers/payment/strip")
 const cors  = require("cors");


        
         const mongoose = require("mongoose");// basicaly it is promiss based  function  it return some promiss
          mongoose.connect(process.env.MONG_URL ,{
            useNewUrlParser: true,
            useUnifiedTopology: true
          
          }).
         then(()=>{
             
         console.log("DB connection succesfully");

         
         }).catch((err)=>{

         console.log(err);

                          
         })
         app.use(bodyperser.json())
         app.use(cors());  
         app.use(express.json());
       app.use("/api/user",userrouter);
       app.use("/api/auth",authetication);
       app.use("/api/products",Product); 
       app.use("/api/cart",cartProduct);
       app.use("/api/order", userorder);
       app.use("api/user" ,payment );
    app.listen( 3001,  ()=>{

 console.log("backend server is running");

 });




 