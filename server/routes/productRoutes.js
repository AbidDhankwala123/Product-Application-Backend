const express = require("express");
const { getAllProductsAndSaveIntoDB,getProductById,updateProduct} = require("../controllers/productController");
const isAuthenticated = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/",getAllProductsAndSaveIntoDB);//Get All Products and Save into db
router.get("/:productId", getProductById);//Get Product by id
router.put("/:productId",updateProduct);//update Product by id

module.exports = router
