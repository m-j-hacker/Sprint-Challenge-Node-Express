const express = require('express');

const router = express.Router();

const actionDb = require('../data/helpers/actionModel.js');

router.post('/', (req, res) => {
    console.log(req.body);
    const { project_id, description, notes } = req.body;
    const newAction = { project_id, description, notes };
    actionDb.insert(newAction)
    .then(actionId => {
        const { id } = actionId;
        actionDb.get(id)
        .then(action => {
            if (!action) {
                return res.status(404).json({ message: "The action with the specified ID does not exist."})
            } else
            return res.status(201).json(action);
        })
        .catch(() => res.status(500).json({ error: "there was an error while saving the action"}))
    })
    .catch(() => res.status(400).json({ error: "Please provide a project ID, description, and notes for the action"}))
})

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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes } = req.body;
    const newAction = { project_id, description, notes };
    actionDb.update(id, newAction)
    .then(action => {
        if (!action) {
            return res.status(404).json({ message: "The action with the specified ID does not exist" })
        } else {
            res.status(200).json(action);
        }
    })
    .catch(() => res.status(500).json({ error: "The action information could not be updated." }))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    actionDb.remove(id)
    .then(removed => {
        if (removed === 0) {
            return res.status(404).json({ message: "The action with the specified ID does not exist. "})
        } else {
            res.status(200).json(removed);
        }
    })
    .catch(() => res.status(500).json({ error: "The action could not be removed"}))
})

module.exports = router;