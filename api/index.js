const express = require("express");
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const repliesRoute = require("./routes/replies");
const categoryRoute = require("./routes/categories");
const verify = require("./util/verify");

dotenv.config();
app.use(cors());

//middleware
app.use(jsonParser); // use it globally
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "/assets")));

mongoose.connect(process.env.MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(console.log("Connected to MongoDb"))
    .catch((err) => console.log(err));


const storageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/images/profiles");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const storageCover = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/images/covers");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const storageAudioCover = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/audios/covers");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const storagePost = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/images/posts");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const storageVideo = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/videos");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const storageAudio = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/audios/posts");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
  
const uploadPost = multer({ storage: storagePost });
const uploadCover = multer({ storage: storageCover });
const uploadAudioCover = multer({ storage: storageAudioCover });
const uploadProfile = multer({ storage: storageProfile });
const uploadVideo = multer({ storage: storageVideo });
const uploadAudio = multer({ storage: storageAudio });


app.post("/api/upload/profiles", verify, uploadProfile.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
    });

app.post("/api/upload/covers", verify, uploadCover.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
    });

app.post("/api/upload/audio-covers", verify, uploadAudioCover.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
    });

app.post("/api/upload/posts", verify, uploadPost.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
    });

app.post("/api/upload/videos", verify, uploadVideo.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
    });

app.post("/api/upload/audios", verify, uploadAudio.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
    });


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/replies", repliesRoute);
app.use("/api/categories", categoryRoute);

app.listen(process.env.PORT, () => {
    console.log("Backend server is running...");
})