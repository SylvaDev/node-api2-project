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
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist' });
        }        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'The post information could not be retrieved' });
    })
})

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ message: 'Please provide title and contents for the post' })
    } else {
        Posts.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'There was an error while saving the post to the database' });
        })
    }
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({ message: 'Please provide title and contents for the post' });
    }

    Posts.findById(id)
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: 'The post with the specified ID does not exist' });
            }
            return Posts.update(id, changes);
        })
        .then(updatedPost => {
            if (updatedPost) {
                return Posts.findById(id);
            }
        })
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'The post information could not be modified' });
        });
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Posts.findById(id)
    .then(post => {
        if(!post) {
            res.status(404).json({ message: 'The post with the specified ID does not exist'})
        } else {
            return Posts.remove(id)
                .then(() => {
                    res.status(200).json(post)
                })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'The post could not be removed' });
    });
})


module.exports = router;