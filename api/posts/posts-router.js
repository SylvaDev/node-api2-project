const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

router.use(express.json());

// Posts Endpoints
// Posts Endpoints
router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'The posts information could not be retrieved' });
    })
})



module.exports = router;