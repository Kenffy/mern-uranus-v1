const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Verify = require("../util/verify");

//GET POST
router.get("/:id", Verify, async (req, res) => {
  try {
    const p = await Post.findById(req.params.id);
    const user = await User.findById(p.userId);
    const post = { 
            ...p._doc,
            username: user.username,
            profile: user.profile,
            cover: user.cover}
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
  const category = req.query.cat || null;
  const popular = req.query.pop || null;
  const random = req.query.random || null;

  let {page, size} = req.query;
  if(!page){page = 1;}
  if(!size){size = 5;}

  const limit = parseInt(size);
  const skip = (page - 1) * size;
  try {
    let posts;
    let nposts;

    if (userId !== null) {
      if(random !== null){
        posts = await Post.aggregate([
          { $match: { userId } },
          { $sample: { size: parseInt(random) } },
        ]);
        nposts = await Post.countDocuments({userId});
      }else if(category!==null && category !== "All" && category !== "Others"){
        posts = await Post.find({category: {$in: category}, userId})
                          .sort({'createdAt': -1}).limit(limit).skip(skip);
        nposts = await Post.countDocuments({category: {$in: category}, userId});
      }else{
        posts = await Post.find({ userId}).sort({'createdAt': -1}).limit(limit).skip(skip);
        nposts = await Post.countDocuments({userId});
      } 
      
    } else if (category!==null && category !== "All" && category !== "Others") {
      posts = await Post.find({
        category: {
          $in: category,
        },
      }).sort({'createdAt': -1}).limit(limit).skip(skip);
      nposts = await Post.countDocuments({category});
    } else if(popular !== null && popular > 0){
        const popularPostIds = await Post.aggregate([
          {$project: {"vues_count": { $size: "$vues" } }},
          {$sort: {"vues_count": -1}}]).limit(Number(popular));
        const popularPosts = [];
        for(item of popularPostIds){
          let postItem = await Post.findById(item._id);
          if(postItem){
            postItem._doc = {...postItem._doc, nvues: item.vues_count};
            popularPosts.push(postItem);
          }
        } 
        posts = popularPosts;
        nposts = await Post.countDocuments();
    }else {
      posts = await Post.find().sort({'createdAt': -1}).limit(limit).skip(skip);
      nposts = await Post.countDocuments();
    }

    let results = [];
    if(posts){
      for(const p of posts){
        const res = await User.findById(p.userId,'username profile cover').exec();
        const { _id, ...user } = res._doc;
        let post;
        if(p._doc){
          post = {...p._doc,...user}
        }else{
          post = {...p,...user}
        }
        results.push(post);
      }
      res.status(200).json({posts: results, page, size, totalOfPosts: nposts});
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

        res.status(200).json({
          ...updatedPost,
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
