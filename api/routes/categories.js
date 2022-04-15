const router = require("express").Router();
const Category = require("../models/Category");
const Verify = require("../util/verify");


// create
router.post("/", Verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      const newCat = new Category(req.body);
      const savedCat = await newCat.save();
      res.status(200).json('category successfully saved!');
    } catch (err) {
      res.status(500).json(err);
    }
  }else{
    res.status(401).json("Only admin can modify this content!");
  }
  
});


// update
router.put("/:id", Verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      const updatedCat = await Category.findByIdAndUpdate(
        req.params.id, {
          $set: req.body
        },
        { new: true }
      );
      res.status(200).json('category successfully updated!');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }else{
    res.status(401).json("Only admin can modify this content!");
  }
});

// delete
//DELETE POST
router.delete("/:id", Verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      const post = await Post.findById(req.params.id);
      await post.delete();
      res.status(200).json('category successfully deleted!');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }else{
    res.status(401).json("Only admin can modify this content!");
  }
});

// get all categoties
router.get("/", Verify, async (req, res) => {
    const samples = req.query.samples || null;
    let cats;
    try {
      if(samples){
        cats = await Category.aggregate([
          { $match: { name: { $not: {$in: ["All", "Others"]} } } },
          { $sample: { size: parseInt(samples) } },
        ]);
      }else{
        cats = await Category.find();
      }      
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get category by id
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if(category){
      res.status(200).json(category);
    }else{
      res.status(404).send('post record not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;