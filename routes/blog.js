var express = require("express");
const { getCurrentDateTime, getDateFromString } = require("../database/common");
const { getBlogs, addBlog } = require("../models/blogs");
const { getUserName } = require("../models/users");
var router = express.Router();
/* GET home page. */
router.get("/", async function (req, res) {
        let blogs = await getBlogs();
        for (let i = 0; i < blogs.length; i++){
                blogs[i].writerName = await getUserName(blogs[i].writerID);
        }
        console.log(blogs);
        blogs.sort(
                (b1, b2) =>
                        getDateFromString(b1.time) > getDateFromString(b2.time)
        );
        res.json({ success: true, blogs: blogs });
});

router.post("/create", function (req, res) {
        newBlog = {
                writerID: parseInt(req.body.writer),
                text: req.body.text,
                time: getCurrentDateTime(),
        };
        addBlog(newBlog);
        res.json({ success: true });
});

module.exports = router;
