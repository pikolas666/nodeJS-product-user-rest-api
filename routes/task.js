const express = require("express");
const router = express.Router();
const {addProduct, updateProduct, getProducts, SetProductToisOnSaleById, getProductById, DeleteProductById, DeleteAllProducts, getProductsQty} = require("../controller/task");

router.post("/products", addProduct); 
router.get("/products", getProducts);

// router.put("/products/:id", SetProductToisOnSaleById);
router.put("/products/:id", updateProduct);
router.get("/products/:id", getProductById);
router.delete("/products", DeleteAllProducts);
router.delete("/products/:id", DeleteProductById);

router.get("/products", getProductsQty);

module.exports = router;