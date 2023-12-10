const router= require('express').Router();

var reviewController=require('../controllers/reviewController')

router.route("/createreview/:userid/")
        .post(reviewController.createReview);
router.route("/getreview/:userid/")
        .get(reviewController.getReview);
module.exports=router;  