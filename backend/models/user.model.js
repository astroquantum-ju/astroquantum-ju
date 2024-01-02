import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "You must provide your name to register."]
    },
    faculty: {
        // type: Schema.Types.ObjectId,
        // ref: "Faculty",
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: [true, "You must provide your current year to study to register."]
    },
    department: {
        type: String,
        required: [true, "Your department is required to register."]
    },
    phone: {
        type: Number,
        required: false,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: [true, "Email id is required to register."],
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "Password is required to proceed."]
    },
    refreshToken: {
        type: String
    }
});

userSchema.pre('save', async function( next ){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash( this.password, 10 );
    next();
});

userSchema.methods.isPasswordCorrect = async function( password ){
    return await bcrypt.compare( this.password, password );
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            phone: this.phone,
            name: this.name,
            branch: this.branch
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        }
    );
}

export const User = mongoose.model( "User", userSchema );