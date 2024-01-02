import { User } from "../../models/user.model.js";

const generateAccessAndRefreshTokens = ( userId ) => {
    try {
        const user = User.findById( userId );
    
        const accessToken = User.generateAccessToken();
        const refreshToken = User.generateRefreshToken();
    
        user.refreshToken = refreshToken;
        user.save({ validateBeforeSave: false });
    
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError( 500, "Something went wrong. Access and Refresh tokenscouldnot be genrated. Error ", error?.message );
    }
};

export { generateAccessAndRefreshTokens };