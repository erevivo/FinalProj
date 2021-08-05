var blogDB = require('./mongo')("blogs");


async function getNewID() {
    let highestID = await blogDB.find().sort({ ID: -1 }).limit(1);
    return highestID.ID + 1;
}


async function addBlog(blog) {
    blog.ID = await getNewID();
    blogDB.insertOne(blog);
}

function getBlogs() {
    return blogDB.find({}).toArray();
}

module.exports = { getBlogs, addBlog};