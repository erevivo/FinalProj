var express = require("express");
const { getCurrentDateTime, getDateFromString } = require("../database/common");
const { getBlogs, addBlog } = require("../models/blogs");
const { getUserName } = require("../models/users");
var router = express.Router();
/* GET home page. */
router.get("/", async function (req, res) {
        blogs = getBlogs();
        blogs.forEach(async (blog) => {
                blog.writerName = await getUserName(blog.writerID);
        });
        blogs.sort(
                (b1, b2) =>
                        getDateFromString(b1.time) > getDateFromString(b2.time)
        );
        res.json({ success: true, blogs: blogs });
});

router.post("/create", function (req, res) {
        newBlog = {
                writerID: req.body.writer,
                text: req.body.text,
                time: getCurrentDateTime(),
        };
        addBlog(newBlog);
        res.json({ success: true });
});

module.exports = router;
