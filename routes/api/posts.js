const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { authMiddleware } = require('../../middleware');
const { User, Post } = require('../../models');

// @route POST api/posts
// @desc Create post
// @access private
router.post(
  '/',
  [
    authMiddleware,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    const userId = req.user.id;

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    try {
      const user = await User.findById(userId).select('-password');
      const newPost = new Post({
        user: userId,
        name: user.name,
        text: req.body.text
      });
      const post = await newPost.save();

      res.status(200).json(post);
    } catch (error) {
      res.status(500, `Internal Server Error`);
    }
  }
);

// @route GET api/posts
// @desc Get all posts
// @access private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500, `Internal Server Error`);
  }
});

module.exports = router;
