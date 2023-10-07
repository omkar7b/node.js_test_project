const blogPost = require("../models/blog")

exports.addBlog = async (req, res) => {
    try {
        const { title, author, content } = req.body;
        const newBlog = await blogPost.create({
            title: title,
            author: author,
            content: content
        })
        res.status(201).json({ newBlogDetails: newBlog });
        console.log('successfully Saved!');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getBlog =  async (req, res) => {
    try {
        const blogs = await blogPost.findAll();
        res.status(201).json({ allBlogs: blogs })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}
