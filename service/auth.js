const sessionIdToUserMap = new Map();

function setUser(id, user){ 
// console.log("Storing session:", sessionId, "for user:", user.email);
sessionIdToUserMap.set(id,user);
}

function getUser(id){
    return sessionIdToUserMap.get(id);
}


module.exports = {
    setUser,
    getUser,
};