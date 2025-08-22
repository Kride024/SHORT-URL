const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    visitHistory:[{ timestamp: {type: Number}}],
    
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },

},{timestamps:true});

const URL = mongoose.model('url',urlSchema);

module.exports = URL;
// This code defines a Mongoose schema for a URL model, which includes fields for a short ID, the original URL, and a history of visits with timestamps. The model is then exported for use in other parts of the application.