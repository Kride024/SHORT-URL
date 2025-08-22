const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const {setUser} = require('../service/auth');



async function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.render("signup",{
            error:"All field are required"
        });
    }
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}


async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user)
        return res.render('login',{
            error:"Invalid email or Password",
        });
    
   // ⚡ only store minimal safe data in token
  // ⚡ include role in payload
    const token = setUser({ 
        _id: user._id.toString(), 
        email: user.email,
        role: user.role 
    });
    // const token = setUser(user);
    res.cookie("token",token);
    return res.redirect("/");
}
module.exports= {
    handleUserSignup,
    handleUserLogin,
};  