const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const blogPost = require('./models/blog');
const Comment = require('./models/comments');

const app = express();
app.use(bodyParser.json({ extended: false }));
app.use(cors());

app.post('/add-blog', async (req, res) => {
    try {
        const { title, author, content } = req.body;
        const newBlog = await blogPost.create({
            title: title,
            author: author,
            content: content
        })
        res.status(201).json({ newBlogDetails: newBlog });
        console.log('successfully Saved!');
        console.log('2>>')
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.get('/get-blog', async (req, res) => {
    try {
        const blogs = await blogPost.findAll();
        res.status(201).json({ allBlogs: blogs })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
})

app.post('/add-comment/:blogId', async (req, res) => {
    try {
        const { comment } = req.body;
        const blogId = req.params.blogId;

        const newComment = await Comment.create({
            comment: comment,
            blogId: blogId,
        })
        res.status(201).json({ newComment });
        console.log('Added Successfully');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: '500 error at comment post' });
    }
})

app.get('/get-comment/:blogId', async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const comments = await Comment.findAll({
            where: { blogId: blogId },
        });
        const commentTexts = comments.map(comment => comment.comment);
        res.status(200).json({ comments: commentTexts });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.delete('/delete-comment/:blogId', async (req, res) => {
    try {
        const { comment } = req.body;
        const blogId = req.params.blogId;

        await Comment.destroy({
            where: { blogId: blogId, comment: comment },
        });

        res.status(204).json({ sucess: true, message: comment });
    } catch (error) {
        console.error(`Error deleting comment for blog ${blogId}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

blogPost.hasMany(Comment);
Comment.belongsTo(blogPost);

sequelize.sync()
    .then(() => {
        app.listen(3000);
        console.log('successful')
    })
    .catch((err) => {
        console.log(err);
    })
