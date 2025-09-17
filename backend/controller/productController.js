import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

//http://localhost:8000/api/v1/product/68bf4b7ff2603e7182703529?keyword=shirt

//creating products
export const createProducts =handleAsyncError( async (req, res, next) => {
    req.body.user = req.user.id;
   
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});
//get all products
export const getAllProducts = handleAsyncError (async (req, res, next) => {

    const resultsPerPage = 3;
    //  console.log(req.query);
    const apiFunctionality = new APIFunctionality(Product.find(), req.query).search().filter();

    // getting filtered query before pagination 
    const filteredQuery = apiFunctionality.query.clone();
    const productCount = await filteredQuery.countDocuments();

    //calculate total page based on filter count 

    const totalPages = Math.ceil(productCount / resultsPerPage);
    const page = Number(req.query.page) || 1;

    if(page > totalPages && productCount >0){
        return next(new HandleError("Invalid page number", 400));
    } 
    
    // apply pagination 

    apiFunctionality.pagination(resultsPerPage);
    const products = await apiFunctionality.query;
    if(!products || products.length === 0){
        return next(new HandleError("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultsPerPage,      
        totalPages,
        currentPage: page
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
//creating and updating reviews 
export const createReviewForProduct = handleAsyncError (async (req, res, next) => {
    const {rating, comment, productId} = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                (rev.rating = rating), (rev.comment = comment);
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        product
    });


})

//Getting Reviews

export const getProductReviews = handleAsyncError (async (req, res, next) => {
    // console.log(req.query.id);
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new HandleError("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

//Delete Reviews

export const deleteReview = handleAsyncError (async (req, res, next) => {
    // console.log(req.query.id);
    const product = await Product.findById(req.query.productId);
    // console.log(product);
    if (!product) {
        return next(new HandleError("Product not found", 404));
    }
    const reviews = product.reviews.filter(
        rev => rev._id.toString() !== req.query.id.toString()
    );
    //  console.log(reviews);
    let sum = 0;
    reviews.forEach((rev) => {
        sum += rev.rating;
    })
    const ratings = reviews.length > 0 ? sum / reviews.length : 0;
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        message: "Review deleted successfully",
        reviews
    });
});
 

//getting all products for admin 

export const getAdminProducts = handleAsyncError (async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    });
});