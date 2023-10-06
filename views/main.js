function submitBlog(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    if (!title || !author || !content) {
        alert("Please fill in all fields.");
        return;
    }
    let blogPost = {
        title: title,
        author: author,
        content: content
    }
    axios.post('http://localhost:3000/add-blog', blogPost)
        .then(response => {
            showOnScreen(response.data.newBlogDetails);
            console.log('1>>>')
        })
        .catch(err => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something Went Wrong</h4>"
            console.log(err);
        })
}

function displayComments(blogId) {
    axios.get(`http://localhost:3000/get-comment/${blogId}`)
        .then(response => {
            const comments = response.data.comments;
            const cardBodyElement = document.getElementById(`cardBody-${blogId}`);
            if (!cardBodyElement) {
                console.error(`Card body for blog ${blogId} not found.`);
                return;
            }

            const commentsElement = document.createElement('div'); 
            comments.forEach(comment => {
                const commentParagraph = document.createElement('p');
                commentParagraph.textContent = comment;
                commentParagraph.style.marginTop = '10px';

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.style.backgroundColor = 'red';
                deleteButton.style.color = 'white';
                deleteButton.style.borderRadius = '5px';
                deleteButton.style.marginLeft = '5px';

                deleteButton.addEventListener('click', function () {
                    deleteComment(blogId, comment);
                });

                commentParagraph.appendChild(deleteButton);

                commentsElement.appendChild(commentParagraph);
            });

            cardBodyElement.appendChild(commentsElement);
        })
        .catch(err => {
            console.error(`Error fetching comments for blog ${blogId}:`, err);
        });
}

function deleteComment(blogId, comment) {
    axios.delete(`http://localhost:3000/delete-comment/${blogId}`, { data: { comment } })
        .then(response => {
            const cardBody = document.getElementById(`cardBody-${blogId}`);
            if (cardBody) {
                const paragraphs = cardBody.querySelectorAll('p');
                comment += 'Delete';
                paragraphs.forEach(para => {
                    if (para.textContent === comment) {
                        para.remove()
                    }
                });
            }
        })
        .catch(err => {
            console.error(`Error deleting comment for blog ${blogId}:`, err);
        });
}

function showOnScreen(blogPost) {
    let parentElement = document.getElementById('blog-posts');

    let cardElement = document.createElement('div');
    cardElement.style.marginTop = '10px';
    cardElement.classList.add('card');

    let cardHeaderElement = document.createElement('div');
    cardHeaderElement.classList.add('card-header');
    cardHeaderElement.style.background = 'lightgray';

    let plusSign = document.createElement('span');
    plusSign.textContent = '+';
    plusSign.style.fontSize = '30px';
    plusSign.style.float = 'right';
    plusSign.style.cursor = 'pointer';


    let titleElementHeader = document.createElement('h3');
    titleElementHeader.style.color = 'darkred';
    titleElementHeader.textContent = blogPost.title;

    let minusSign = document.createElement('span');
    minusSign.textContent = '-';
    minusSign.style.float = 'right';
    minusSign.style.fontSize = '30px';
    minusSign.style.cursor = 'pointer';
    minusSign.style.display = 'none';

  
    plusSign.addEventListener('click', function () {
        cardBodyElement.style.display = 'block';
        plusSign.style.display = 'none';
        minusSign.style.display = 'block';
    });

    minusSign.addEventListener('click', function () {
        cardBodyElement.style.display = 'none';
        plusSign.style.display = 'block';
        minusSign.style.display = 'none';
    });

    cardHeaderElement.appendChild(titleElementHeader);
    cardHeaderElement.appendChild(plusSign);
    cardHeaderElement.appendChild(minusSign);

    let cardBodyElement = document.createElement('div');
    cardBodyElement.style.background = 'lightgray';
    cardBodyElement.classList.add('card-body');
    cardBodyElement.setAttribute('id', `cardBody-${blogPost.id}`); 

    let authorElement = document.createElement('p');
    authorElement.textContent = `Author: ${blogPost.author}`;

    let contentElement = document.createElement('p');
    contentElement.style.marginLeft = '10px';
    contentElement.textContent = blogPost.content;

    let commentElement = document.createElement('p')
    commentElement.style.fontWeight = 'bold';
    commentElement.textContent = 'Comments:';

    let commentInput = document.createElement('input');
    commentInput.setAttribute('type', 'text');
    commentInput.setAttribute('placeholder', 'Write a Comment');
    commentInput.setAttribute('id', `commentInput-${blogPost.id}`); 
    let submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'button');
    submitButton.style.backgroundColor = 'green'
    submitButton.style.color = 'white'
    submitButton.style.borderRadius = '5px';
    submitButton.style.marginLeft = '5px';
    submitButton.textContent = 'Post';

    submitButton.addEventListener('click', function () {
        submitComment(blogPost.id);
    });

    cardBodyElement.appendChild(authorElement);
    cardBodyElement.appendChild(contentElement);
    cardBodyElement.appendChild(commentElement);
    cardBodyElement.appendChild(commentInput);
    cardBodyElement.appendChild(submitButton);

    displayComments(blogPost.id);

    cardElement.appendChild(cardHeaderElement);
    cardElement.appendChild(cardBodyElement);

    parentElement.appendChild(cardElement);

}

function submitComment(blogId) {
    const commentInput = document.querySelector(`#commentInput-${blogId}`);
    const comment = commentInput.value;

    if (!comment) {
        console.error('Comment is empty.');
        return;
    }

    axios.post(`http://localhost:3000/add-comment/${blogId}`, { comment })
        .then(response => {

            commentInput.value = '';

            const cardBodyElement = document.getElementById(`cardBody-${blogId}`);
            if (cardBodyElement) {
                const commentParagraph = document.createElement('p');
                commentParagraph.textContent = comment;
                commentParagraph.style.marginTop = '10px';
                let commentId = response.data.newComment.id;
                commentParagraph.id = `comment-${commentId}`;


                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.style.backgroundColor = 'red';
                deleteButton.style.color = 'white';
                deleteButton.style.borderRadius = '5px';
                deleteButton.style.marginLeft = '5px';

                deleteButton.addEventListener('click', function () {
                    deleteComment(blogId, comment);
                });

                commentParagraph.appendChild(deleteButton);

                cardBodyElement.appendChild(commentParagraph);
            }
        })
        .catch(err => {
            console.error(`Error submitting comment for blog ${blogId}:`, err);
        });
}


function fetchAndDisplayBlogs() {
    axios.get('http://localhost:3000/get-blog')
        .then(response => {
    
            for (let i = 0; i < response.data.allBlogs.length; i++) {
                const blog = response.data.allBlogs[i];
                showOnScreen(blog);

            }
        })
        .catch(err => {
            console.log(err);
        });
}


window.addEventListener('DOMContentLoaded', fetchAndDisplayBlogs);