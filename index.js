const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const { connectToMongoDB} = require("./connect");
const { checkForAuthentication, restrictTo }=require('./middlewares/auth')
const URL = require('./models/url');


const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user');


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
app.use(cookieParser());
app.use(checkForAuthentication);




app.use((err, req, res, next) => {
    console.error("Unexpected error:", err);
    res.status(500).send("Something went wrong!");
});

app.use("/url",restrictTo(["NORMAL","ADMIN"]) ,urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);


app.listen(PORT,()=>console.log(`Server Started at PORT :${PORT}`));  