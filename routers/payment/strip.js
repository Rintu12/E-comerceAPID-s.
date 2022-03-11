//strip payment gateconst
const router = require("express").Router();
const  stripe = require("stripe")(process.env.SERECT_KEY_STRIPE);

router.post("/payment", (req,res) =>{

 stripe.charges.create(
    {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "INR",
      },(stripeerr,striperes) =>{

  if(stripeerr){
      res.status(500).json(stripeerr);
  } else{
        res.status(200).json(striperes);
       }

      }
 );


});

module.exports =  router;