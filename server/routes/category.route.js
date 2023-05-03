const router = require('express').Router();
const CategoryController = require("../controllers/category.controller");
//POST
router.post('/categories', CategoryController.create);

router.get('/categories', CategoryController.findAll);
router.delete('/categories/:id', CategoryController.delete);


module.exports = router;