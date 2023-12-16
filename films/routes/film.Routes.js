const router= require('express').Router();

var filmController=require('../controllers/filmController')

router.route("/filmsearch")
        .post(filmController.filmsearch);
router.route("/getidbyFilm/:title")
        .get(filmController.getidbyFilm);
module.exports=router;  