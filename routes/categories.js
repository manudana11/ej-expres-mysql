const express = require('express');
const CategoriesController = require("../controllers/categoriesController")
const router = express.Router();

router.post("/addcategorie", CategoriesController.insert);

router.put('/categories/id/:id', CategoriesController.uppdatecat);
  
router.get('/allcategories', CategoriesController.allCats);

router.get('/categories/id/:id', CategoriesController.selectById);


module.exports = router;