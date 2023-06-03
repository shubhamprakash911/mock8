const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./controller/user.router");
const app = express();
const cors=require("cors");
const { postRouter } = require("./controller/post.router");
require("dotenv").config()


app.get("/",(req,res)=>{
    res.status(200).send({message:"server is working fine"})
})

//middlewares
app.use(cors())
app.use(express.json());
app.use("/user",userRouter)
app.use("/post",postRouter)

app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("database is successfully connected to server")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is listing at port ",process.env.port)
})