const user = require("../models/user");
const {check} = require("express-validator");

module.exports = {

    validateEmail:check('email').trim() // to delete leading and trilling space
    .normalizeEmail()                   //noramlize the email address
    .isEmail()                         // checking is the email address follow the format
     .withMessage("Invalid email")    // custom massage
     // custom validation

     .custom( async (email) =>{
      const existingUser = await user.findOne({email})

      if(existingUser){
          throw new Error("email alredy  use")
      }



     })


};