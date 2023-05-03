const router = require('express').Router();
const uploadCloud = require('../middlewares/upload-photo');
const OwnerController = require("../controllers/owner.controller");

//POST
router.post('/owners',uploadCloud.single('photo'), OwnerController.create)

router.get('/owners', OwnerController.findAll);
router.get('/owners/:id', OwnerController.getOne);

router.delete('/owners/:id', OwnerController.delete);
router.put("/owners/:id", OwnerController.updateProfile);


module.exports = router;