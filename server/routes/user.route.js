const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verify-token");

router.post("/auth/signup", UserController.create);
router.post("/auth/login", UserController.login);

router.get("/auth/user", verifyToken, UserController.profile);
router.put("/auth/user", verifyToken, UserController.updateProfile);


module.exports = router;