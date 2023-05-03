const Review = require("../models/review");
const Product = require("../models/product");

class ReviewController {
  async getReview(req, res) {
    try {
      const productReviews = await Review.find({
        productID: req.params.productID,
      })
        .populate("user")
        .exec();

      res.json({
        success: true,
        reviews: productReviews,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async postReview(req, res){
    try {
      const review = new Review();
      review.headline = req.body.headline;
      review.body = req.body.body;
      review.user = req.decoded._id;
      review.productID = req.params.productID;

      await Product.findOneAndUpdate(
        {_id: req.params.productID},
        {
          $push: {
            reviews: review._id
          }
        }
        );
      const savedReview = await review.save();

      if (savedReview) {
        res.json({
          success: true,
          message: "Succesfully Added Review"
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
      console.log(err);
    }
  }
}

module.exports = new ReviewController();
