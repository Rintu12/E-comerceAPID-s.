
const jwt = require("jsonwebtoken");


 const veirfyToken = (req,res,next) =>{
      
   const authheader = req.headers.token;
  if(authheader){
      const token = authheader.split(" ")[1];

    jwt.verify(token,process.env.JWT_SEC,(err,  User) =>{

            if(err)   res.status(403).json("json token is not valid");  
            req.User = User;
             
            next();
             
    });
     
    // res.end();
  }else{

  return   res.status(401).json(" you are not authenticated");
  
  }

  
 };
// AUTHENTICATION USER TOKEN
  const veryfyTokenAuth = (req,res,next) =>{
    
     veirfyToken(req,res,()=>{
   if(req.User.id === req.params.id || req.User.isAdmin){
     next();
   }else{
   return res.status(403).json("you are not authenticated")
   }
     });
  }
// ISADMIN

   const isAdminverifyToken = (req,res,next) =>{
  
     try{

       veirfyToken(req,res,() =>{
             if(req.User.isAdmin = true){
               
               next();

            }else{

            res.status(401).json("you are not allow to do this")

            }
       });
      }catch(err){

      res.status(500).json(err)

      }
   }

  module.exports = {veirfyToken,veryfyTokenAuth,isAdminverifyToken};







































