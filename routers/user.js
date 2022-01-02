const router =  require("express").Router()
const cryptojs = require("crypto-js")
 const {veryfyTokenAuth ,isAdminverifyToken} = require("./verifyToken");
 const user  = require("../models/user")


// UPDATE
router.put("/:id",veryfyTokenAuth, async(req,res) =>{

  if(req.body.password){

    req.body.password = cryptojs.AES.             //if user change the password  before encrypted  the pass word updated
                        encrypt(req.body.password,
                          process.env.PASSWORD_ENC
                          ).toString();
  }

 
   // updated the user document in db
   try{
     const updateduser = await user.findByIdAndUpdate(req.params.id,{

      $set:req.body
     },{new:true}      // if do that return the updated;
     );
   
       res.status(200).json(updateduser);

   }catch(err){

    return res.status(500).json(err);

   }
  

});
// DELETE  USER


 router.delete("/:id",veryfyTokenAuth,async(req,res)=>{

   try{                                                 // try  continue delete process 
    await user.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been delete .......")
   }catch(err){                                         // if  any error 
                               
     res.status(500).json(err);
   }
 });


   // GET USER
   router.get("/find/:id" ,isAdminverifyToken, async (req,res) =>{

   try{
      const User = await user.findById(req.params.id);
       const {password , ...others} = User._doc;

     res.status(200).json(others);
     
    }catch(err){

     res.status(500).json(err);
       
    }
   });

// GET ALL USER
    router.get("/", async (req, res) => {
   const query = req.query.new;
  try {
    const users = query
      ? await user.find().sort({ _id: -1 }).limit(5)
      : await user.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

 // GET USER STATS
 router.get("/stats", isAdminverifyToken, async ( res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
