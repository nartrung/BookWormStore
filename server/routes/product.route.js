const router = require('express').Router();
const ProductController = require("../controllers/product.controller");
const uploadCloud = require('../middlewares/upload-photo');

// POST - create a new product
router.post('/products',uploadCloud.single('photo'), ProductController.create);
// GET - Get all products
router.get('/products', ProductController.getAll);
// GET - Get a single products
router.get('/products/:id', ProductController.getOne);
// PUT - Update a single products
router.put('/products/:id',uploadCloud.single('photo'),ProductController.update);
//DELETE - Delete a single product
router.delete('/products/:id', ProductController.delete);

module.exports = router;