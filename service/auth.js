
const jwt = require("jsonwebtoken");
const secret = "Piyush$123@$";



function setUser( user){ 

 return jwt.sign(user, secret, { expiresIn: "1h" });
}

function getUser(token){
   
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null; // invalid token
    }

}


module.exports = {
    setUser,
    getUser,
};