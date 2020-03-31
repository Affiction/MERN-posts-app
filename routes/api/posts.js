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
      console.error(error.message);

      res.status(500).json('Internal Server Error');
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
    console.error(error.message);

    res.status(500).json('Internal Server Error');
  }
});

// @route GET api/posts/:id
// @desc Get post by ID
// @access private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ errors: [{ msg: 'Post not found' }] });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error.message);

    if (error.kind == 'ObjectId') {
      return res.status(400).json({ errors: [{ msg: 'Post not found' }] });
    }

    res.status(500).json('Internal Server Error');
  }
});

// @route DELETE api/posts/:id
// @desc Delete post by ID
// @access private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await post.remove();

    res.status(204).send();
  } catch (error) {
    console.error(error.message);

    if (error.kind == 'ObjectId') {
      return res.status(400).json({ errors: [{ msg: 'Post not found' }] });
    }

    res.status(500).json('Internal Server Error');
  }
});

// @route POST api/posts/comment/:id
// @desc Comment for post
// @access private
router.post(
  '/comment/:id',
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
      const post = await Post.findById(req.params.id);
      const newComment = {
        user: userId,
        name: user.name,
        text: req.body.text
      };
      const updatedCommentsList = [...post.comments, newComment];

      post.comments = updatedCommentsList;

      await post.save();

      res.status(200).json(post.comments);
    } catch (error) {
      console.error(error.message);

      res.status(500).json('Internal Server Error');
    }
  }
);

// @route POST api/posts/comment/:id/:comment_id
// @desc Delete comment with specific ID
// @access private
router.delete('/comment/:id/:comment_id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: "Comment doesn't exist" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const updatedComments = post.comments.filter(
      comment => comment.id !== req.params.comment_id
    );

    post.comments = [...updatedComments];

    await post.save();

    res.status(204).send();
  } catch (error) {
    console.error(error.message);

    res.status(500).json('Internal Server Error');
  }
});

module.exports = router;
