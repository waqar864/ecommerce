import express from 'express';
import { getAllProducts, createProducts, updateProduct, deleteProduct,getSingleProduct } from '../controller/productController.js';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';
const router = express.Router();


//Routes for products



router.route("/products").get(verifyUserAuth, getAllProducts).post(verifyUserAuth, roleBasedAccess("admin"),createProducts);
router.route("/product/:id").put(verifyUserAuth,updateProduct).delete(verifyUserAuth,deleteProduct).get(verifyUserAuth,getSingleProduct);

export default router;