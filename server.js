const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routs = require("./router/routes");
const connectDB = require("./config/connectDb.js")
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname,"public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(routs);

connectDB()

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is listning on port ${port}`);
})
