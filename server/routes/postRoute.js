const express = require('express');
const { createPost, fetchAllPost, fetchSinglePost, fetchPostByCategory } = require('../controller/postController');

const router = express.Router()

// create post
router.post('/', createPost)

// Fetch All POst
router.get('/', fetchAllPost)

// Fetch single post
router.get('/single-post/:id', fetchSinglePost);

// Fetch post by categories
router.get('/post-categories/:categories', fetchPostByCategory)

module.exports = router;