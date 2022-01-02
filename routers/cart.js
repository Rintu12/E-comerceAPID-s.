const router = require("express").Router();
 const cart = require("../models/cart");
 

 const {veryfyTokenAuth ,isAdminverifyToken,veirfyToken} = require("./verifyToken");
  //CREATE CART
  router.post("/",veirfyToken,async(req,res)=>{
    const Newcart = new cart(req.body);
  try{

     const savecart =  await Newcart.save();
     res.status(200).json(savecart);


  }catch (err){

     res.status(500).json(err);

  }
  });
  

//updated
router.put("/:id",veryfyTokenAuth, async (req, res) => {
    try {
      const updatedCart = await cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//GET USER CART
router.get("/find/:userId", veryfyTokenAuth, async (req, res) => {
    try {
      const Cart = await cart.findOne({ userId: req.params.userId });
      res.status(200).json(Cart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // GET ALL CART


router.get("/", isAdminverifyToken, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});


 module.exports = router;




















module.exports = router;