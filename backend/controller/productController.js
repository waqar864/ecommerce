import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

//http://localhost:8000/api/v1/product/68bf4b7ff2603e7182703529?keyword=shirt

//creating products
export const createProducts =handleAsyncError( async (req, res, next) => {
   
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});
//get all products
export const getAllProducts = handleAsyncError (async (req, res, next) => {
    //  console.log(req.query);
    const apiFunctionality = new APIFunctionality(Product.find(), req.query).search();
    
    const products = await apiFunctionality.query;
    res.status(200).json({
        success: true,
        products
    });
});


//update product

export const updateProduct = handleAsyncError (async (req, res,next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new HandleError("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    });


    
});

//delete product

export const deleteProduct = handleAsyncError (async (req, res, next) => {
    let product = Product.findById(req.params.id);

    if (!product) {
        return next(new HandleError("Product not found", 404));
    }
    product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});

//fetching single product details
export const getSingleProduct = handleAsyncError (async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new HandleError("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        product
    });
});