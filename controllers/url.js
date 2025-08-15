const shortid  = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req,res){
const shortID = shortid();
const body = req.body;
if(!body.url) return res.status(400).json({error:"url is required"});
await URL.create({
    shortId:shortID,
    redirectUrl:body.url,
    visitHistory:[],
});
return res.render("home",{
    id:shortID,
});
}//http://localhost:8001/url


async function handleGetDetails(req,res){
const shortId = req.params.shortId;
const entry =  await URL.findOneAndUpdate({ shortId},{ $push:{visitHistory: {timestamp:Date.now(),}} });
if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
}

res.redirect(entry.redirectUrl);    
}

async function handleGetAnalytics(req,res){
const shortId = req.params.shortId;
const result = await URL.findOne({shortId});
if(!result) return res.status(404).json({error:"Short URL not found"});
return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
});
}//http://localhost:8001/url/analytics/shortId

module.exports ={
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleGetDetails
};