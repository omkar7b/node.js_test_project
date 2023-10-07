const Comment = require("../models/comments");

exports.postComment = async (req, res) => {
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
}

exports.getComment =  async (req, res) => {
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
}


exports.deleteComment = async (req, res) => {
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
}