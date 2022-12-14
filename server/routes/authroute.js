const  express = require("express")
const router = express.Router();
const {usercreation,userlogin,getUser,googleusercreation,userUpdatation}=require('../controller/authentication');
const authenticate =require('../middleware/authenticate');
router.route("/signup").post(usercreation);
router.route("/login").post(userlogin);
router.route("/user").post(authenticate,getUser);
router.route("/googleuser").post(googleusercreation);
router.route("/user").put(authenticate,userUpdatation);

module.exports=router;