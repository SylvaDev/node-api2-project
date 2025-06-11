const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

router.use(express.json());

// Posts Endpoints
// Posts Endpoints
router.get('/', (req, res) => {
    Posts.find(req.body)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'The posts information could not be retrieved' });
    })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post){
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist' });
        }        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'The post information could not be retrieved' });
    })
})



module.exports = router;