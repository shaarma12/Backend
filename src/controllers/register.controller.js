import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/users.model.js"
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
    // get user detail from frontend
    //  validation - not empty
    // check if user alreay exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in DB
    // remove password and refresh token field from response
    // check for user creation
    // return response

    
    const { username, email, fullName} = req.body;
    
    // console.log("username", username);
    // console.log("email", email);
    // console.log("fullName", fullName);
    
    // validation for data fields is not empty 
    if ([username, email, fullName].some((value) => value?.trim() === ""))
    {
        throw new ApiError(400, "Getting Error!!");
    }
    // check for existed user is in the DB.
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    
    if (existedUser)
    {
        throw new ApiError(409, "User with email or username already exists");
    }
    
    // for coverImage and avatar 
    const avatarLocalPath = req.files?.avatar[0].path;
    const coverImagePath = req.files?.coverImage[0].path;
    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }
    
    const avatar = await uploadonCloudinary(avatarLocalPath);
    const coverImage = await uploadonCloudinary(coverImagePath);

    if (!avatar)
    {
        throw new ApiError(400, "Avatar file is required")    
    }
    
    // Create new DB entry

    const user = await User.create({
        username: username.toLowerCase(),
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password
    });

    // Remove password and refresh token from response
    
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // check for new user creation in DB.
    if (!createdUser)
    {
        throw new ApiError(500, "Something went Wrong while registering the user");    
    }
    // Return response after new user created in DB
    return res.status(201).json(
        new ApiResponse(200, "User Registered Successfully!!")
    )

}) 
export { registerUser };