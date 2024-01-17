import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  //SET JWT as HTTP-Only cookie
  // cookie name jwt
  // options : httponly :true because when in production it will be false
  // secure = only true when production when in development it is not true;
  // sameSite will protect from attacks
  // maxAge 30days
  //The res.cookie method is used to set a cookie in the HTTP response
  //the token will be stored here and gonna get send with every subsequent request that you make

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
