const mongoose = require("mongoose")
const postSchema= mongoose.Schema({
    name: String,
    description: String,
    category: String,
    image: {type:String,default:"https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7fbc5e94-8d49-4730-a280-f19d3cfad0b0/custom-nike-air-max-90-by-you.png"},
    location: String,
    date: {type:Date,default:Date.now},
    price: Number,
    
})

const postModel= mongoose.model("post",postSchema)

module.exports={postModel}