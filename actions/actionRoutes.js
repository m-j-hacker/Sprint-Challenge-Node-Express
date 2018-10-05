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

module.exports = router;