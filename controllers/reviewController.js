const mongoose = require("mongoose");
const User = mongoose.model("UserInfo");
const Review = mongoose.model("ReviewsInfo");

//Create Review
exports.createReview = async(req,res)=>{
    const {userid} = req.params;
    const {rate,title,text} = req.body; //body request for the parameters of register 
    try{
        const user = await User.findOne({_id: userid})//see if the email has already created or used
        if(!user)
        {
          return res.send("User don't exist");
        }
        else //if the other conditions are false, this is one is setted
        {
            res.send("");
            await Review.create({
            rate,
            title,
            text
        });
        }
       
    }catch(error){
        console.log(error)
        res.send("Error");
    }
};

//Get Reviews by user
exports.getReview = async(req,res)=>{
    const {userid} = req.params;
    const {rate,title,text} = req.body; //body request for the parameters of register 
    try{
        const user = await User.findOne({_id: userid})//see if the email has already created or used
        if(!user)
        {
          return res.send("User don't exist");
        }
        else //if the other conditions are false, this is one is setted
        {
            res.send("");
            await Review.create({
            rate,
            title,
            text
        });
        }
       
    }catch(error){
        console.log(error)
        res.send("Error");
    }
};


