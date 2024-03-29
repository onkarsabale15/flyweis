const mongoose = require('mongoose');
const express = require("express");
const app = express();
const env = require("dotenv");
env.config();
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 3000;


const routes = require("./route/index")





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes.authRoutes);
app.use(routes.userRoutes);
app.use(routes.matchRoutes);


app.get("/", (req, res) => {
    res.send("Hello, :)\nThis is my assignment.\nFollow this link to postman : https://www.postman.com/science-observer-72340836/workspace/flyweis/collection/23901864-918644ff-08b3-4ac0-87f9-74558a522af4?action=share&creator=23901864");
})



mongoose.connect(DB_URI).then(() => {
    console.log('Connected to DB');
}).catch(err => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})