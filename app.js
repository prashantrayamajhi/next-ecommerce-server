const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
require("./security/passport")(passport);

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
const AuthRoute = require("./routes/auth.route");
const CategoryRoute = require("./routes/category.route");
const ProductRoute = require("./routes/products.route");
const ProfileRoute = require("./routes/profile.route");

// routes middleware
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/products", ProductRoute);
app.use("/api/v1/profile", ProfileRoute);

module.exports = app;
