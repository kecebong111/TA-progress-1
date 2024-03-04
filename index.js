const express = require('express');
const app = express();
const PORT = 6969;

const userRoute = require("./user");
app.use("/user",userRoute);

app.listen(PORT, () => {
    console.log("Server running);")
});