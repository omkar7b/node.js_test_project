const express = require('express');
const router = express.Router();
const {postComment, getComment, deleteComment} = require('../controllers/comments');

router.post('/add-comment/:blogId', postComment);
router.get('/get-comment/:blogId', getComment);
router.delete('/delete-comment/:blogId', deleteComment);

module.exports = router;
