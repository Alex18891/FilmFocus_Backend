const router= require('express').Router();

var reviewController=require('../controllers/reviewController')

router.route("/createreview")
        .post(reviewController.createReview);
router.route("/getreview/:userid")
        .get(reviewController.getReview);
router.route("/getallreview")
        .get(reviewController.getallReview);
router.route("/getReviewbyFilm/:filmId")
        .get(reviewController.getReviewbyFilm);
module.exports=router;  