const express = require('express');
const { createUser, login, userImage } = require('../controller/userController');

const router = express.Router()

// create user
router.post('/create-user', createUser)

// user login
router.post('/login', login)

// Upload user image
router.post('/upload-image/:id', userImage)

module.exports = router;