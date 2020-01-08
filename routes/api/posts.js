const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const User = require('../../models/User')
const Post = require('../../models/Posts')
const auth = require('../../middleware/auth')

// @route   POST api/posts
// @desc    Create new post
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is a required field')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const user = await User.findById(req.user.id).select('-password')

      const post = new Post({
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      })

      newPost = await post.save()
      res.json(newPost)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route   GET api/posts
// @desc    Get all posts
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ msg: 'No post found' })
    }
    return res.json(post)
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No post found' })
    }
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status('No post found')
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    await post.remove()
    res.json({ msg: 'Post Removed' })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status('No post found')
    }
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   PUT api/posts/like/:id
// @desc    Add like to post
// @access  Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    // get post
    const post = await Post.findById(req.params.id)

    // check if user has already liked post
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'User has already liked this post' })
    }

    // add like to like array
    post.likes.unshift({
      user: req.user.id
    })

    // save post
    await post.save()

    res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   PUT api/posts/unlike/:id
// @desc    Remove like from post
// @access  Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // check if user has not already liked post
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'User has not liked this post' })
    }

    // remove like
    const likeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id)
    post.likes.splice(likeIndex, 1)
    await post.save()
    res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/posts/comment/:id
// @desc    Create new post
// @access  Private

router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is a required field')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = await Post.findById(req.params.id)

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      }

      post.comments.unshift(newComment)

      await post.save()
      res.json(post.comments)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route   DELETE api/posts/comment/:post_id/:id
// @desc    Delete a comment
// @access  Private

router.delete('/comment/:post_id/:id', auth, async (req, res) => {
  try {
    // get post
    const post = await Post.findById(req.params.post_id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    // find comment
    const comment = post.comments.find(
      comment => comment.id.toString() === req.params.id
    )
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' })
    }

    // check if comment belongs to user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    // delete comment
    const commentIndex = post.comments
      .map(comment => comment._id)
      .indexOf(req.params.id)
    post.comments.splice(commentIndex, 1)
    await post.save()
    res.json(post.comments)
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Not Found' })
    }
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
