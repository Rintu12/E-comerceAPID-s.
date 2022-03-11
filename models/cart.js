// cart modules
 const mongoose = require('mongoose');
 const cartSchema = new mongoose.Schema({


     userId:{type: mongoose.Schema.Types.ObjectId , ref: 'user',required:true},

    // one user many product 
    products :[

        { 
          productId:{type:mongoose.Schema.Types.ObjectId,ref: 'product',required:true},
            quentity:{
              type:Number,
              default:1,
              
            },
            size:{type:String},
            
             
        },
    ],

 },
 {timestamps:true}
 
 );

 module.exports = mongoose.model('cart',cartSchema);









