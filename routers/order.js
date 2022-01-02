const router = require("express").Router();

  const order = require("../models/order");
  const {veryfyTokenAuth ,isAdminverifyToken, veirfyToken} = require("./verifyToken");
  //CREATE ORDER

  router.post("/",veirfyToken, async(req,res)=>{

   const Order = new order(req.body);

  try{
   const saveorder = await Order.save();
   res.status(200).json(saveorder);

  }catch(err){


  res.status(500).json(err);


  }
   
  })

  // DELETE ORDER

  router.delete("/:id",isAdminverifyToken, async(req,res) =>{

    try{
   await order.findByIdAndDelete(req.params.id);
    res.status(200).json("order ahs been delete.........");
    }catch(err){

  res.status(500).json(err)


    }

  });



  //UPDATE ORDER

  router.put("/:id",isAdminverifyToken,async(req,res) =>{
        try{
            const updatedOrder = await order.findByIdAndUpdate(
                {
                    $set:req.body,
                },
                {new:true}
            );
            res.status(200).json(updatedOrder);

        }catch(err){
            res.status(500).json(err)
        }
  });

  /// GET USER ORDER
  router.get("find/:userId",veryfyTokenAuth,async(req,res) =>{

  try{
      const orders = await order.find({userId:req.params.userId});
      res.status(200).json(orders);

  }catch(err){

    res.status(500).json(err)
  }

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