// cart modules
 const mongoose = require("mongoose");
 const cartSchema = new mongoose.Schema({


     userId:{type:String,required:true},

    // one user many product 
    products :[

        { productId:{

              type:String,
            },
            quentity:{
              type:Number,
              default:1,
            },

        },
    ],

 },
 {timestamps:true}
 
 );

 module.exports = ('cart',cartSchema);









