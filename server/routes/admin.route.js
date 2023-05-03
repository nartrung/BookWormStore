const router = require("express").Router();
const AdminController= require("../controllers/admin.controller");
const verifyToken = require("../middlewares/verify-token");

router.post("/auth/signup", AdminController.create);
router.post("/auth/login", AdminController.login);

router.get("/auth/admin", verifyToken, AdminController.profile);

module.exports = router;