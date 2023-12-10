const router= require('express').Router();

var reviewController=require('../controllers/reviewController')

router.route("/createreview/:userid/")
        .post(reviewController.createReview);
module.exports=router;  