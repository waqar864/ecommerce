import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

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
 
    sendToken(user,201,res);
    
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

  

   sendToken(user,200,res);
})


//logout

export const logout = handleAsyncError (async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "Successfully Logged Out"
    });
})

//forgot password

export const requestPasswordReset = handleAsyncError (async (req, res, next) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return next(new HandleError("User not found", 404));
    }
    let resetToken;

    try {
        resetToken = user.genrateResetPasswordToken();
        console.log(resetToken);
        await user.save({ validateBeforeSave: false });
    } catch (error) {
        return next(new HandleError("Could not save reset token, please try again later", 500));
    }


    const resetPasswordURL = `http://localhost/api/v1/reset/${resetToken}`;
    // console.log(resetPasswordURL);
    const message = `Your password reset token is :- \n\n ${resetPasswordURL} \n\nIf you have not requested this email then please ignore it.`;
    try {
        await sendEmail({
            email:user.email,
            subject:"Ecommerce Password Recovery",
            message:message
    });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new HandleError("Email could not be sent", 500));
    }
})

//reset password

export const resetPassword = handleAsyncError (async (req, res, next) => {

    // console.log(req.params.token);
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) {
        return next(new HandleError("Password reset token is invalid or has been expired", 400));
    }
    const {password, confirmPassword} = req.body;
    if(password !== confirmPassword){
        return next(new HandleError("Password does not match", 400));
    }
    // if (req.body.password !== req.body.confirmPassword) {
    //     return next(new HandleError("Password does not match", 400));
    // }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user,200,res);
})


//get user details 

export const getUserDetails = handleAsyncError (async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
})