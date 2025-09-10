import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";

export const registerUser = handleAsyncError (async (req, res, next) => {

    const {name,email,password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profile pic url"
        }
    });

    const token = user.getJWTToken();
    res.status(201).json({
        success: true,
        user,
        token
    });
    
})

//login

export const loginUser = handleAsyncError (async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new HandleError("Please enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new HandleError("Invalid email or password", 401));
    }

    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
        return next(new HandleError("Invalid email or password", 401));
    }

  

    const token = user.getJWTToken();
    res.status(200).json({
        success: true,
        user,
        token
    });
})