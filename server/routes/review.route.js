const router = require("express").Router();
const ReviewController = require("../controllers/review.controller");
const verifyToken = require("../middlewares/verify-token");

router.get("/reviews/:productID", ReviewController.getReview);
router.post("/reviews/:productID", verifyToken, ReviewController.postReview);

module.exports = router;