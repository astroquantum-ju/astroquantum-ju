import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { generateAccessAndRefreshTokens } from "./controllers_utils/generateAccessAndRefreshTokens.controllers.utils.js";

const registerUser = asyncHandler( async ( req, res, next ) => {
    //store the details 
    const { name, faculty, year, branch, phone, email, password } = req.body;
    console.log("Name : ", name);

    //validation
    if( [ name, faculty, year, branch, phone, email, password ].some( (field) => field?.trim() === "" ) ){
        throw new ApiError(400, "All fields are mandatory");
    }

    //existing user check
    const existingUser = await User.findOne({
        $or: [{email}, {phone}]
    });

    if(existingUser){
        throw new ApiError(400, "User already exists");
    }

    //creating user
    const user = await User.create({
        name,
        faculty: faculty.toUpperCase(),
        year,
        branch,
        phone,
        email: email.toLowerCase(),
        password
    });

    //getting the user from the database to send as a response.
    const createdUser = await User.findById( user?._id ).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user.");
    }

    //returing response
    return res.
    status(200)
    .json(
        new ApiResponse(
            200,
            createdUser,
            "User created successfully."
        )
    )

} );

const loginUser = asyncHandler( async ( req, res, next ) => {
    const { email, phone, password } = req.body;

    if( !( email || phone ) ){
        throw new ApiError(400, "Either phone number or email is required.");
    }

    const user = await User.findOne({
        $or: [{email}, {phone}]
    })

    if(!user){
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = user.isPasswordCorrect( password );

    if(!isPasswordValid){
        throw new ApiError(401, "Wrong Password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens( user?._id );

    const loggedInUser = await User.findById( user?._id ).select( "-password -refreshToken" );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
    .status(200)
    .cookie( "accessToken", accessToken, options )
    .cookie( "refreshToken", refreshToken, options )
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged-in successfully."
        )
    )

} );

export { registerUser, loginUser };