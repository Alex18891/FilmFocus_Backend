const mongoose = require("mongoose");
const User = mongoose.model("UserInfo");
const Review = mongoose.model("ReviewsInfo");


//Create Review

/**
 * @openapi
 * /createreview:
 *   post:
 *     summary: Create a review for a user
 *     tags:
 *       - Review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInfo'
 *     responses:
 *       200:
 *         description: Review created successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
exports.createReview = async(req,res)=>{
    const {userId,rate,title,text} = req.body; //body request for the parameters of register 
    try{
        const user = await User.findOne({_id: userId})//see if the email has already created or used
        if(!user)
        {
          return res.send("User don't exist");
        }
        else //if the other conditions are false, this is one is setted
        {
            res.send("");
            await Review.create({
            userId,
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

/**
 * @openapi
 * /getreview/{userid}:
 *   get:
 *     summary: Get reviews for a user
 *     tags:
 *       - Review
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         description: ID of the user to get reviews for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
exports.getReview = async(req,res)=>{
    const {userid} = req.params;
    try{
        const user = await User.findOne({_id: userid})//see if the email has already created or used
        if(!user)
        {
          return res.send("User don't exist");
        }
        else //if the other conditions are false, this is one is setted
        {
            const reviews = await Review.findOne({userid});
            return res.send(reviews)
        }

    }catch(error){
        console.log(error)
        res.send("Error");
    }
};

/**
 * @openapi
 * /getallreviews:
 *   get:
 *     summary: Get all reviews
 *     tags:
 *       - Review
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 *       500:
 *         description: Internal Server Error
 */
exports.getallReview = async(req,res)=>{
    try{
        const reviews = await Review.find();
        return res.send(reviews)
    }catch(error){
        console.log(error)
        res.send("Error");
    }
};
