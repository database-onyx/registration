// mongodb+srv://admin:<password>@image.ghzhekl.mongodb.net/?retryWrites=true&w=majority
// admin

const express = require("express");
const multer = require("multer");
const app = express();
const mongoose = require("mongoose");
const imageModel = require("./model/model.js");
const bodyparser = require("body-parser");
const https = require("https");
const request = require("request");
const path = require("path")
app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({ extended: true }));
const PORT = 3003;


const dbUrl = "mongodb+srv://admin:Violinwalker%40onyx@image.ghzhekl.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(dbUrl, connectionParams)
    .then(function() {
        console.info("Pinged your deployment. You successfully connected to MongoDB!")
    }).catch(function(e) {
        console.log("Error While connecting to database: ", e);
    })

const Storage = multer.diskStorage({
    destination: "./uploads",
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: Storage
}).single("photo")


app.use(express.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    app.post("/", function(req, res) {
        upload(req, res, async function(err) {
            if (err) {
                console.log(err)
            } else {

                const name = req.body.name;
                const number = req.body.phonenumber;
                const image = req.file.filename;
                const consoledraft = "Name : " + name + ", Phone Number: " + number + ", image name :" + image;
                console.log(consoledraft);
                const ImageModel = new imageModel({
                    name: name,
                    number: number,
                    image: image
                });
                try {
                    const savedImage = ImageModel.save();
                    console.log("Image sent to the database");
                    res.status(200).sendFile(__dirname + "/public/success.html");
                } catch (error) {
                    console.error(error);
                    res.status(500).send({ "error": "Failed to insert to DB: " + error.message });
                }
            }
        });
    });
});
app.listen(PORT, function(response) {
    console.log("Its currently breathing in the Port :", PORT)
});