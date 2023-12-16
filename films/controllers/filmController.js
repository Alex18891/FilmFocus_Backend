const mongoose = require("mongoose");
const Film = mongoose.model("Filminfo");


//Film search
/**
 * @openapi
 * /filmsearch:
 *   post:
 *     summary: Search for a film
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Film found
 *       404:
 *         description: Film not found
 */
exports.filmsearch = async(req,res)=>{
    const {title} = req.body; 
    try {
        const userData = await Film.findOne({title});//see if the email is in the mongodatabase
        if(!userData)
        {
            res.json({title:"Film doesn't exist"});
        }
        else{
            res.json({id:userData._id,overview: userData.overview,title:userData.title,popularity:userData.popularity,
                production_companies: userData.production_companies, release_date:userData.release_date,
                vote_average: userData.vote_average,vote_count:userData.vote_count,status:userData.status,
                belongs_to_collection: userData.belongs_to_collection,poster_path:userData.poster_path,video:userData.video,tagline:userData.tagline,
                homepage:userData.homepage,genres:userData.genres,
            });
        } 
    }catch(error){
        console.log(error);
    }       
};


/**
 * @openapi
 * /getreviewbyfilm/{filmId}:
 *   get:
 *     summary: Get review by film ID
 *     tags:
 *       - Review
 *     parameters:
 *       - in: path
 *         name: filmId
 *         required: true
 *         description: Getting filmid through title of the film
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review for the film retrieved successfully
 *       404:
 *         description: Film not found
 *       500:
 *         description: Internal Server Error
 */
exports.getidbyFilm = async(req,res)=>{
    const {title} = req.params;
    try{
        const film = await Film.findOne({title})//see if the email has already created or used
        console.log(film)
        if(!film)
        {
          return res.send("Film don't exist");
        }
        else //if the other conditions are false, this is one is setted
        {
            return res.send(film._id)
        }

    }catch(error){
        console.log(error)
        res.send("Error");
    }
};
