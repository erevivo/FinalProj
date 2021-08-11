var blogDB = require("./mongo")("blogs");
var { getCurrentDateTime } = require("../database/common");

async function getNewID() {
        let highestID = await blogDB.find().sort({ ID: -1 }).limit(1);
        return highestID.ID + 1;
}

async function addBlog(blog) {
        blog.ID = await getNewID();
        console.log("new ID "+ blog.ID);
        blog.time = getCurrentDateTime();
        blogDB.insertOne(blog);
}

function getBlogs() {
        return blogDB.find({}).toArray();
}

module.exports = { getBlogs, addBlog };
