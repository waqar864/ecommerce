import express from 'express';
import { getAllProducts, createProducts, updateProduct, deleteProduct,getSingleProduct, getAdminProducts } from '../controller/productController.js';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';
const router = express.Router();


//Routes for products



router.route("/products").get(verifyUserAuth,roleBasedAccess("admin"), getAdminProducts);
router.route("/admin/products").get( getAllProducts);
router.route("/admin/product/create").post(verifyUserAuth, roleBasedAccess("admin"),createProducts);
router.route("/admin/product/:id").put(verifyUserAuth,roleBasedAccess("admin"),updateProduct).delete(verifyUserAuth,roleBasedAccess("admin"),deleteProduct);
router.route("/product/:id").get(getSingleProduct);

export default router;