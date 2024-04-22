import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index:true // index is used for searching purpose.
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index:true
    },
    avatar: {
        type: String, //cloudinary url
        required: true,
    },
    coverImage: {
        type: String, //cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password: {
        type: String,
        required:[true,"Password is required"]
    },
    refreshToken: {
        type:String,
    }

}, { timeStamps: true });

//  pre hook - save so it is useful when we need to any action before saving of data in database so here that we are doing we are encrypt the password before saving the database we are doing encryption by the use bcrypt package.

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10); // for encryption of password
    next();
});

// methods creation for checking password is correct or not as user send decrypt password like abc123 but in our database password is stored in encrypted so to check password is correct or not .

userSchema.methods.isPasswordCorrect = async function (password)
{
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAcessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName:this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model("User", userSchema);