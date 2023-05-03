const Product = require("../models/product");

class ProductController {
  async create(req, res) {
    console.log(req.file);
    try {
      let product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        photo: req.file.path,
        stockQuantity: req.body.stockQuantity,
        owner: req.body.ownerID,
        category: req.body.categoryID,
      });
      await product.save();
      res.json({
        status: true,
        message: "Successfully created new product",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async getAll(req, res) {
    try {
      let products = await Product.find().populate("owner category").exec();
      res.json({
        success: true,
        products: products,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async getOne(req, res) {
    try {
      let product = await Product.findOne({ _id: req.params.id })
        .populate("owner category")
        .exec();
      res.json({
        success: true,
        product: product,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async update(req, res) {
    try {
        let product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            {
              $set: {
                title: req.body.title,
                price: req.body.price,
                category: req.body.categoryID,
                photo: req.file.path,
                stockQuantity: req.body.stockQuantity,
                description: req.body.description,
                owner: req.body.ownerID
              }
            },
            { upsert: true }
          );
      res.json({
        success: true,
        updatedProduct: product,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async delete(req, res) {
    try {
      let deleteProduct = await Product.findOneAndDelete({
        _id: req.params.id,
      });

      if (deleteProduct) {
        res.json({
          status: true,
          message: "Successfully deleted",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new ProductController();
