import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

//Protect route will protectroutes  users will are already logged in

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Read jwt from the cookie

  token = req.cookies.jwt;

  if (token) {
    try {
      //decode object has a field called userId;
      //attesting user onto req body will make that user available on futher protected routes like get profile
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.userId).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not Authorized, no token');
  }
});

//Admin mdw functions will be for users that are admin
//Admin middleware

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized (admin only)');
  }
};

export { protect, admin };
