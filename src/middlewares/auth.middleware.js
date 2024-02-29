import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", ""));

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Verify the access token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Set the user object in the request
    req.user = {}; // Or set it to whatever you need for the logout route
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
