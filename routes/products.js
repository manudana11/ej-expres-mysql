const express = require('express');
const ProductController = require("../controllers/ProductsController.js");
const router = express.Router();

router.post("/", ProductController.instert);

router.put('/id/:id', ProductController.updateProd);

router.get('/allproducts', ProductController.getAll);

router.get('/id/:id', ProductController.selectById);

router.get('/desc', ProductController.productsDesc);

router.get('/products/product_name/:product_name', ProductController.selectByName);

router.delete('/delete/id/:id', ProductController.delete);

module.exports = router;