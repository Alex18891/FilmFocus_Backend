const router= require('express').Router();

var filmController=require('../controllers/filmController')

router.route("/filmsearch")
        .post(filmController.filmsearch);
router.route("/getReviewbyFilm/:title")
        .get(filmController.getReviewbyFilm);
module.exports=router;  