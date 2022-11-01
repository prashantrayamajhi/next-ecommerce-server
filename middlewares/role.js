// admin middleware
exports.isAdmin = (req, res, next) => {
  if (req.user.roles !== "admin") {
    return res.status(403).json({
      error: "You are not an admin",
    });
  }
  next();
};

// seller middleware
exports.isSeller = (req, res, next) => {
  if (req.user.roles !== "seller") {
    return res.status(403).json({
      error: "You are not a seller",
    });
  }
  next();
};
