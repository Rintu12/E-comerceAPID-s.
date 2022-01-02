const mongoose = require("mongoose");


 const orderSchema = new mongoose.Schema({

    userId:{type:String,required:true},

    // one user many product 
    products :[

        {
           productId:{

              type:String,
            },
            quentity:{
              type:Number,
              default:1,
            },

        },
    ],

    amount:{type:Number,required:true},

   addres:{type:Object,required:true},

   status:{type:String,default:"pending"},
    
 });



 module.exports = ("order",orderSchema);























