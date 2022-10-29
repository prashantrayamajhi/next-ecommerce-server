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
const ProductsRoute = require("./routes/products.route");
const CategoryRoute = require("./routes/category.route");

// admin routes
const AdminCategoryRoute = require("./routes/admin/category.route");
const AdminProductRoute = require("./routes/admin/products.route");
// const AdminProfileRoute = require("./routes/profile.route");

// seller routes
const SellerProductRoute = require("./routes/sellers/products.route");

// profile
const ProfileRoutes = require("./routes/profile.route")
 
// routes middleware
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/products", ProductsRoute);
app.use("/api/v1/categories", CategoryRoute);

//admin
app.use("/api/v1/admin/category", AdminCategoryRoute);
app.use("/api/v1/admin/products", AdminProductRoute);

// seller
app.use("/api/v1/seller/products", SellerProductRoute);
app.use("/api/v1/category", SellerProductRoute);

//profile
app.use("/api/v1/profile", ProfileRoutes)

module.exports = app;
