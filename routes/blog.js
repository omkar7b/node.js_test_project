const express = require('express');
const router = express.Router();
const { addBlog, getBlog } = require('../controllers/blog'); 

router.post('/add-blog', addBlog);
router.get('/get-blog', getBlog);

module.exports = router;
