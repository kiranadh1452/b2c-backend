// required pacakges
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

// required dependencies from other files
const connectToDb = require("./config/db");
const customerRoute = require("./routes/customerRoute");
const sellerRoute = require("./routes/sellerRoute");
const productRoute = require("./routes/productRoute");

// specifying where to read the environment variables from
dotenv.config({
    path: "./config/.env",
});

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

connectToDb(mongoUri);

const app = express();
app.set("port", port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// user related routes
app.use("/api/customer", customerRoute);

// admin related routes
app.use("/api/seller", sellerRoute);

// product related routes
app.use("/api/product", productRoute);

// for any endpoint that is not found, follow this route
app.use("*", (req, res, next) => {
    return res.status(400).json({
        message: "Invalid Request",
    });
});

const server = app.listen(port, () => {
    console.log(`Server is listening at http: //localhost:${port} ${Date()}`);
});
