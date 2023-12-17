const mongoose = require("mongoose");
const Review = mongoose.model("ReviewsInfo");
const axios = require('axios');

async function getuserbyid(userId) {
    try {
        const response = await axios.get(`http://etff2612/users-repo:5000/getuserbyId/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Unable to find this user');
    }
}

async function getfilmid(title) {
    try {
        const response = await axios.get(`http://etff2612/films-repo:6000/getidbyFilm/${title}`);
        return response.data;
    } catch (error) {
      if (error.response) {
        // O servidor respondeu com um status de erro (por exemplo, 4xx, 5xx)
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta do servidor
        console.error('No response received:', error.request);
      } else {
        // Um erro ocorreu durante a configuração da requisição
        console.error('Error setting up the request:', error.message);
      }
  
      // Lança um novo erro com a mensagem personalizada
      throw new Error('Unable to find this user');
    }
  }
  

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
    const {userId,filmId,rate,title,text} = req.body; //body request for the parameters of register 
    try{
        const user = await getuserbyid(userId)  //see if the email has already created or used
        if(!user)
        {
          return res.send("User don't exist");
        }
        else //if the other conditions are false, this is one is setted
        {
            res.send("");
            await Review.create({
            userId,
            filmId,
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
 *         description: Getting reviews by userId
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
    const {userId} = req.params;
    try{
        const user = await getuserbyid(userId)   //see if the email has already created or used
        if(!user)
        {
          return res.send("User don't exist");
        }
        else //if the other conditions are false, this is one is setted
        {
            const reviews = await Review.findOne({userId});
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

/**
 * @openapi
 * /getreviewbyfilm/{title}:
 *   get:
 *     summary: Get review by film title
 *     tags:
 *       - Review
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         description: Getting the reviews through title
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review for the film retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Define the properties of the review object here
 *       404:
 *         description: Film not found
 *       500:
 *         description: Internal Server Error
 */
exports.getReviewbyFilm = async(req,res)=>{
    const {title} = req.params;
    try{
        const filmId = await getfilmid(title)//see if the email has already created or used
        if(!filmId)
        {
          return res.send("Review don't exist");
        }
        else //if the other conditions are false, this is one is setted
        {
            const reviews = await Review.findOne({filmId});
            return res.send(reviews)
        }

    }catch(error){
        console.log(error)
        res.send("Error");
    }
};


