const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Verify = require("../util/verify");

//GET POST
router.get("/:id", Verify, async (req, res) => {
  try {
    const p = await Post.findById(req.params.id);
    //let imageUrls = [];
    //let audioUrls = [];
    // if(p){
    //   p.images.forEach((image)=>{
    //     imageUrls.push(process.env.POSTS+image);
    //   })

    //   p.audios.forEach((audio)=>{
    //     audioUrls.push({
    //       ...audio,
    //       cover: audio.cover.length > 0 ? process.env.AUDIO_COVERS+audio.cover : "",
    //       url: process.env.AUDIOS+audio.filename,
    //     })
    //   })
    // }
    const user = await User.findById(p.userId);
    const post = { 
            ...p._doc,
            //images: imageUrls,
            //audios: audioUrls,
            username: user.username,
            profile: user.profileImage,
            cover: user.coverImage}
    if(post){
      res.status(200).json(post);
    }else{
      res.status(404).send('post record not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL POSTS
router.get("/", Verify, async (req, res) => {
  const userId = req.query.user || null;
  const categoryName = req.query.cat || null;
  const popular = req.query.pop || null;
  try {
    let posts;
    if (userId) {
      posts = await Post.find({ userId });
    } else if (categoryName!==null && categoryName !== "All" && categoryName !== "Others") {
      posts = await Post.find({
        category: {
          $in: categoryName,
        },
      });
    } else if(popular !== null && popular > 0){
      posts = await Post.find().sort({"vues": -1}).limit(Number(popular));
    }else {
      posts = await Post.find();
    }

    let users = await User.find();

    let results = [];
    if(posts && users){
      posts.forEach((p)=>{
        const result = users.filter(u=>u._id.toString() ===p.userId)[0];
        const { password, updatedAt, ...user } = result._doc;
        // let imageUrls = [];
        // let audioUrls = [];
        // p.images.forEach((image)=>{
        //   imageUrls.push(process.env.POSTS+image);
        // })
        // p.audios.forEach((audio)=>{
        //   audioUrls.push({
        //     ...audio,
        //     cover: audio.cover.length > 0 ? process.env.AUDIO_COVERS+audio.cover : "",
        //     url: process.env.AUDIOS+audio.filename,
        //   })
        // })
        const post = {
          ...p._doc, 
          //images: imageUrls,
          //audios: audioUrls,
          username: user.username,
          profile: user.profile,
          cover: user.cover
        }
        results.push(post);
      });
      res.status(200).json(results);
    }else{
      res.status(200).json("No posts record found!");
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//CREATE POST
router.post("/", Verify, async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    const currentUser = await User.findById(req.user.id);
    await currentUser.updateOne({ $push: { posts: newPost._id.toString() } });

    const post = {
      ...newPost,
      username: currentUser.username,
      profile: currentUser.profile,
      cover: currentUser.cover
    }
    res.status(200).json(post);
    //res.status(200).json("post successfully created!");
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", Verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.user.id) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id, {
            $set: req.body
          },
          { new: true }
        );
        // let imageUrls = [];
        // let audioUrls = [];
        // if(updatedPost){
        //   updatedPost.images.forEach((image)=>{
        //     imageUrls.push(process.env.POSTS+image);
        //   })
        //   updatedPost.audios.forEach((audio)=>{
        //     audioUrls.push({
        //       ...audio,
        //       cover: audio.cover.length > 0 ? process.env.AUDIO_COVERS+audio.cover : "",
        //       url: process.env.AUDIOS+audio.filename,
        //     })
        //   })
        // }
        res.status(200).json({
          ...updatedPost,
          //images: imageUrls,
          //audios: audioUrls,
          username: post.username,
          profile: post.profile,
          cover: post.cover
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//LIKE / DISLIKE POST
router.put("/:id/like", Verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//VUE POST
router.put("/:id/vue", Verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.vues.includes(req.user.id)) {
      await post.updateOne({ $push: { vues: req.user.id } });
      res.status(200).json("Thank you for reading this post");
    }else{
      res.status(200).json("You already read this post");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", Verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post && post.userId === req.user.id) {
      try {
        const currentUser = await User.findById(req.user.id);
        if (currentUser.posts.includes(post._id.toString())) {
          await currentUser.updateOne({ $pull: { posts: post._id.toString() } });
        }
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
