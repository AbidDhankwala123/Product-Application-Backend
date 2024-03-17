const express = require("express");
const { getAllProductsAndSaveIntoDB,getProductById,updateProduct} = require("../controllers/productController");
const isAuthenticated = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/",isAuthenticated,getAllProductsAndSaveIntoDB);//Get All Products and Save into db
router.get("/:productId",isAuthenticated, getProductById);//Get Product by id
router.put("/:productId",isAuthenticated,updateProduct);//update Product by id

module.exports = router
