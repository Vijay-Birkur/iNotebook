const express=require('express');
const router = express.Router();
const User=require("../models/User");
const {body,validationResult}=require('express-validator');
//creating user using: POST "/api/author/createuser" -No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min:5})] , async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    //checking whether user already exists
    try{
        let user= await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "User with this mail already exists"})
        }
        user=await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,

        })
        res.json(user);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("OOPS!! Error occured..");
    }
})
module.exports = router
 




