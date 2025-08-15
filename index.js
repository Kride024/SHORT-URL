const express = require("express");
const path = require("path");
const { connectToMongoDB} = require("./connect");
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter')
const URL = require('./models/url');

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log("MongoDB connected")
).catch((err)=>console.log("MongoDB connection failed",err)
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({extended:false}));




app.use("/url",urlRoute);
app.use("/",staticRoute);

app.listen(PORT,()=>console.log(`Server Started at PORT :${PORT}`));