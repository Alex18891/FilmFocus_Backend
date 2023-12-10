const router= require('express').Router();

var utilizadorController=require('../controllers/filmController')

router.route("/filmsearch")
        .post(utilizadorController.filmsearch);
module.exports=router;  