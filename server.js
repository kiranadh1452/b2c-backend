// root server file
const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});
