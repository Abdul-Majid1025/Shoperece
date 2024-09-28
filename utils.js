const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  console.log("generateToken", user);
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      verified: user.verified,
      role: user.role,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      phone: user.phone,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "15d",
    }
  );
};

exports.isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

module.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};
