// admin middleware
exports.isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    return res.status(403).json({
      error: "You are not an admin",
    });
  }
  next();
};
