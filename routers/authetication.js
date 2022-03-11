// create authecation module to create new user


  const router = require("express").Router();
  const user = require('../models/user');
  const cryptojs = require("crypto-js");
  const jwttoken = require("jsonwebtoken");
  const { validateEmail} = require("./validator");
const { validationResult } = require("express-validator");
  
  // RESITER TO THE NEW USER
    router.post('/resister',[validateEmail],async(req,res) => {

        const newuser = new user({
    
          username: req.body.username,
          email:req.body.email,
          password:cryptojs.AES.encrypt(req.body.password,process.env.PASSWORD_ENC).toString(),

        }); 
           

        try{ 
           // check email use allready or not
          const errors = validationResult(req)
          if(!errors.isEmpty())
          {
             res.status(403).json(errors);
          }
            

            const saveuser =  await newuser.save();
            const {password , ...others} = saveuser._doc;
            res.status(201).json(others);

          
        }catch(err){

              res.status(500).json(err)
            //  

        }
      });

 /// LOGIN FUNCION
                
           router.post("/login", async(req,res)=>{
             
             try{

              const User = await  user.findOne({username:req.body.username});


                !User && res.status(401).json("wrong user name");
             const hashedpassword =    cryptojs.AES.decrypt(
               

                  User.password,
                  process.env.PASSWORD_ENC
              
             );
             const original_password = hashedpassword.toString(cryptojs.enc.Utf8);
              const input_password =  req.body.password;
             
             
             original_password != input_password &&
              res.status(401).json("wrong password");




              //after login genarate jwt token to this user

              

               
               const accestoken =  jwttoken.sign(
                 // generate the payload
                 
                {
                  id :User._id,
                  isAdmin:User.isAdmin
                },  
                process.env.JWT_SEC,
                {expiresIn:"2d"}
               
               );
              
                   
                    // except password all field save to the db
                    // destructure the object
                    const { password , ...others } = User._doc;


              // everything is ok then 
              res.status(200).json({ ...others , accestoken });

             }catch(err){

                             
                   res.status(500).json(err); 
              
             }
           

           });

               module.exports = router;


            

  


             




























