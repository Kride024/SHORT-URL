const User = require("../models/user");

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
    if(!email ||!password){
        return res.status(400).json({error:"All fields are required"});
    }
    const user = await User.findOne({email,password});
    if(!user){
        return res.render("login",{
            error:"Invalid email or Password"
        })
    }
    return res.redirect("/");
}
module.exports= {
    handleUserSignup,
    handleUserLogin,
};