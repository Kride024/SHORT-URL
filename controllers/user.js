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
    const token = setUser({ id: user._id.toString(), email: user.email });

    // set httpOnly cookie
    res.cookie("uid", token, {
        httpOnly: true,
        secure: false, // set true if using https
        sameSite: "strict"
    });

    return res.redirect("/");
}
module.exports= {
    handleUserSignup,
    handleUserLogin,
};  