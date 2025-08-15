const express = require('express');
const URL = require('../models/url'); // or wherever your model is


const router = express.Router();


router.get("/",async (req,res)=>{
    const allurls = await URL.find({});
    return res.render("home",{
        urls: allurls,
    });
});


module.exports = router;