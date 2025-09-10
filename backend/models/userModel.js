import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
},{
    timestamps: true});

    //Password hash using bcrypt js package
userSchema.pre("save", async function(next){
    // if(!this.isModified("password")){
    //     next();
    // }
    this.password = await bcryptjs.hash(this.password, 10);
    //1st - updating profile (name , email , image )
    if(!this.isModified("password")){
       return next();
    }

    //2nd - updating password
});

export default mongoose.model("User", userSchema);  