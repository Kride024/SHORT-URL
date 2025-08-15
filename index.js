const express = require("express");
const { connectToMongoDB} = require("./connect");
const urlRoute = require('./routes/url');
const URL = require('./models/url');


connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log("MongoDB connected")
).catch((err)=>console.log("MongoDB connection failed",err)
);


const app = express();
const PORT = 8001;

app.use(express.json());


app.use("/url",urlRoute);

app.listen(PORT,()=>console.log(`Server Started at PORT :${PORT}`));