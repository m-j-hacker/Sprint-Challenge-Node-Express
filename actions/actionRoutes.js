const express = require('express');

const router = express.Router();

const actionDb = require('../data/helpers/actionModel.js');

router.get('/', (req, res) => {
    actionDb.get()
    .then(actions => {
        console.log('*** ACTIONS ***', actions);
        res.status(200).json(actions);
    })
    .catch(() => res.status(404).json({ error: "The actions could not be retrieved" }))
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    actionDb.get(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(() => res.status(404).json({ message: "The action with the specified ID does not exist"}))
})

module.exports = router;