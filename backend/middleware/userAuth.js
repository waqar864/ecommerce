import handleAsyncError from "./handleAsyncError.js";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import jwt from "jsonwebtoken";


export const verifyUserAuth = handleAsyncError (async (req, res, next) => {
    
    const {token} = req.cookies;
    console.log(token);

    if(!token){
        return next(new HandleError("Please login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodedData.id);
    next();
})

export const roleBasedAccess = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new HandleError(`Role ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    }
}