const router = require("express").Router();
 const cart = require("../models/cart");
 
 const {veryfyTokenAuth ,isAdminverifyToken,veirfyToken} = require("./verifyToken");
const { json } = require("express");
  //CREATE CART 
  //adding cart iteam
  router.post("/user/addCart",veirfyToken,async(req,res) =>{
    // res.status(200).json({message:"well come"});
    

       //*************************FINED THE USER IS all reasy exit */
     cart.findOne({userId: req.User.id})
     .exec( async(error,Cart) =>{
      
     //  if any error
     if(error) return res.status(400).json({error});
     if(Cart){  
        req.body.products.forEach((productIteam) =>{
            
           const product = productIteam.productId;

        

       // if cart iteams product is all ready exit
      //  const product = req.body.products.productId; //  get the product 
       /// compaire the  input product and exiting product "additeams"
       const iteam = Cart.products.find((c) => c.productId == product )
        
       //************************IF ITEAM ALRSY EAXIT */
       if(iteam){
         // if  iteam all ready exit then updated the product 

        cart.findOneAndUpdate({"userId":req.User.id , "products.productId":product },{
          $set:{
             "products.$.quentity":iteam.quentity +productIteam.quentity
            

   
          }
              
        })
        .exec((error ,_Cart) => {
  
  
          if(error) return res.status(400).json({ error})
          if(_Cart) {
              return res.status(200).json({Cart: _Cart})
          }
        })

    //*** ***************************IF ITEAM NOT EXIT TO THIS USER THEN ADD ITEAM */
       }else{
         // if user already exits then only updated the user cart
       //find user to the cart document and updated the products array 
       cart.findOneAndUpdate({"userId":req.User.id},{
        $push:{
          "products":req.body.products

        }
        
      })
      .exec((error ,_Cart) => {


        if(error) return res.status(400).json({ error})
        if(_Cart) {
            return res.status(200).json({Cart: _Cart})
        }
       })
       }
      });
      //  res.status(200).json({message:Cart});
   //************************IF USER NOT EXIT THEN CREATE THE CART TO THIS USER */
     } else{

      // if customer new then create new cart to this  user
      const Cart = new cart({
        userId:req.User.id,
        products:req.body.products
        
     });

      Cart.save((error , Cart) =>{
         if(error) {
           return res.status(400).json({error});
         }
         if(Cart){

         return res.status(200).json({Cart});
         }
      }); 
     }

     });
  });


  /**  GET ITEAM TO THE USER CART FROM THE CART DOCUMENT DATABASE */
   
  
   router.post("/getuserCart" ,veirfyToken , (req , res) =>{

     // find the req user in cart document
     cart.findOne({userId:req.User.id})
     .populate("products.productId" , "_id title  size color price img ")  // populate the user cart cart product from the cart document save by user
     .exec((error , Cart) =>{
      
       if(error) return res.status(400).json({error})
       if(Cart){
                        
         let products  = [];
      
         Cart.products.map((iteam , index) => {

           products[index] = {

            _id:iteam.productId._id.toString(),
            title:iteam.productId.title,
            price:iteam.productId.price,
            img:iteam.productId.img,
            quentity:iteam.quentity,
            
           }
          });
           // everything is ok then  response the message
           res.status(200).json({products});

       }

     })
    
   });




 

module.exports = router;