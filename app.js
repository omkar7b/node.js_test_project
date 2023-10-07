const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const blogPost = require('./models/blog');
const Comment = require('./models/comments');
const blogRoutes = require('./routes/blog');
const commentRoutes = require('./routes/comments');

const app = express();
app.use(bodyParser.json({ extended: false }));
app.use(cors());

app.use('/blog', blogRoutes);
app.use('/comment', commentRoutes)

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
