import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Token diperlukan",
    });
  }

  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      message: "JWT secret tidak ditemukan",
    });
  }

  try {
    const jwtDecode = jwt.verify(token, secret);
    req.userData = jwtDecode; // Menyimpan data pengguna ke req.userData
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default authMiddleware;

// import express from "express";
// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   const validationReq = req;
//   const { authorization } = validationReq.headers;

//   if (!authorization) {
//     return res.status(401).json({
//       message: "Token diperlukan",
//     });
//   }

//   const token = authorization.split(" ")[1];
//   const secret = process.env.JWT_SECRET;

//   if (!secret) {
//     return res.status(500).json({
//       message: "JWT secret tidak ditemukan",
//     });
//   }

//   try {
//     const jwtDecode = jwt.verify(token, secret);
//     if (typeof jwtDecode !== "string") {
//       validationReq.userData = jwtDecode;
//     }
//   } catch (error) {
//     return res.status(401).json({
//       message: "Unauthorized",
//     });
//   }
//   next();
// };

// export default authMiddleware;
