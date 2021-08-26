var express = require("express");
const { getCurrentDateTime, getDateTimeFromString } = require("../database/common");
const { getBlogs, addBlog } = require("../models/blogs");
const { getUserName } = require("../models/users");
var router = express.Router();
/* GET home page. */
router.get("/", async function (req, res) {
        let blogs = await getBlogs();

        console.log(blogs);
        blogs.sort(
                (b1, b2) =>
                        getDateTimeFromString(b1.time) > getDateTimeFromString(b2.time)
        );
        res.json({ success: true, blogs: blogs });
});

router.post("/create", async function (req, res) {
        newBlog = {
                writerName: req.body.writer,
                text: req.body.text,
                time: getCurrentDateTime(),
        };
        await addBlog(newBlog);
        res.json({ success: true, blog: newBlog });
});

module.exports = router;
