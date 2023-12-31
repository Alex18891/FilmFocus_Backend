const router= require('express').Router();

var utilizadorController=require('../controllers/userController')

router.route("/forgotpassword") 
        .post(utilizadorController.forgotpassword);
router.route("/loginuser")
        .post(utilizadorController.loginuser); 
router.route("/register")
        .post(utilizadorController.register); 
router.route("/resetpassword/:id/:token")
        .get(utilizadorController.resetpasswordget);
router.route("/resetpassword/:id/:token")
        .post(utilizadorController.resetpasswordpost);
router.route("/getuserbyId/:userId")
        .get(utilizadorController.finduser) 
module.exports=router;  