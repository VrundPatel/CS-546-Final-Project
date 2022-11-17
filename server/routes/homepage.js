const express = require('express');
const path = require('path');
const router = express.Router();

//TODO: Add a landing page

router.route('/')
    .get(async (req, res) => {
        res.sendFile("homepage.html", {root: path.join(__dirname, "../../client/public")});
    });
module.exports = router;