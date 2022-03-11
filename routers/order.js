const router = require("express").Router();

  
  const UserAddress = require("../models/order")

  const {veryfyTokenAuth ,isAdminverifyToken, veirfyToken} = require("./verifyToken");
 
  // add order to the user
 router.post("/user/addOrder" ,veirfyToken , (req , res) =>{
    
   UserAddress.findOne({userId: req.User.id})
   .exec( async(error,newOrder) =>{
    if(error) {
        res.status(403).json({error});
      // return;
    }
    if(newOrder){
     if(req.body.address){ // cheack the body is present address body to the user
          UserAddress.findOneAndUpdate({"userId":req.User.id},
          {
            $push: {
              "address": req.body.address
            }
          }
          ).exec((error, _newOrder) =>{
            if(error){
             return  res.status(400).json({error})
            }
           if(!_newOrder){  // cheack if the address is alredy 
              res.status(200).json({newOrder:_newOrder})
             
           }else {
             return;
           }

          });
        }
        
      /// if iteam is present
      if(req.body.items){

      UserAddress.findOneAndUpdate({"userId": req.User.id},
        {
          $push: {
            "items": req.body.items
          }
        }
      ).exec((error , _newitems) =>{
        if(error){
          return res.status(403).json({error})
        }
       if(_newitems){
         res.status(200).json({newOrder:_newitems});
          
       }
      })
      }
    }else{
      const newOrder =    new UserAddress({
        userId:req.User.id,
        address:req.body.Address,
        // items:req.body.items
       })
      
       newOrder.save((error , newOrder) =>{

      if( error) {

        return res.sendStatus(403)
      }
      if(newOrder){
        
       return res.status(200).json({newOrder})

      }
       });
      }

    

  
 });

});


   // GET ALL

router.get("/", isAdminverifyToken, async (req, res) => {
  try {
    const orders = await order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

/// get montly   income

router.get("/income", isAdminverifyToken, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
