const  express = require("express")
const router = express.Router();
const {usercreation,userlogin,getUser,googleusercreation,userUpdatation}=require('../controller/authentication');
const authenticate =require('../middleware/authenticate');
const passport=require('passport');
router.route("/signup").post(usercreation);
router.route("/login").post(userlogin);
router.route("/user").post(authenticate,getUser);
router.route("/googleuser").post(googleusercreation);
router.route("/user").put(authenticate,userUpdatation);
router.route("/login/success").get((req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.route("/login/failed").get((req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.route("/google").get(passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})	
);

router.route("/logout").get((req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});



module.exports=router;