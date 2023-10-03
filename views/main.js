function submitBlog(event) {
    event.preventDefault(); // Prevent form submission to refresh the page
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    let blogPost = {
        title: title,
        author: author,
        content: content
    }

    showOnScreen(blogPost)
}

function showOnScreen(blogPost){
    let parentElement = document.getElementById('blog-posts');
    let childElement = document.createElement('li');

    childElement.innerText = `${blogPost.title} - ${blogPost.author} - ${blogPost.content}`
    parentElement.appendChild(childElement);
}
