const express = require('express');

const router = express.Router();

const projectDb = require('../data/helpers/projectModel.js');

router.get('/', (req, res) => {
    projectDb.get()
    .then(projects => {
        console.log('\n***PROJECTS***\n', projects);
        res.status(200).json(projects);
    })
    .catch(() => res.status(404).json({ error: "The projects could not be retrieved"}))
})

router.post('/', (req, res) => {
    console.log(req.body);
    const { name, description } = req.body;
    const newProject = { name, description }
    projectDb.insert(newProject)
    .then(projectId => {
        const { id } = projectId;
        projectDb.get(id)
        .then(project => {
            if (!project) {
                return res.status(404).json({ message: "The project with the specified ID does not exist."})
            } else
            return res.status(201).json(project);
        })
        .catch(() => res.status(500).json({ error: "There was an error while saving the project"}))
    })
    .catch(() => res.status(400).json({ error: "Please provide a name and descripton for the project." }))
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    projectDb.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(() => res.status(404).json({ message: "The project with the specified ID does not exist"}))
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const newProject = { name, description };
    projectDb.update(id, newProject)
    .then(project => {
        console.log('project = ', project);
        if (!project) {
            return res.status(404).json({ message: "The post with the specified ID does not exist."})
        } else {
            res.status(200).json(newProject)
        }
    })
    .catch(() => res.status(500).json({ error: "The project information could not be modified."}))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    projectDb.remove(id)
    .then(removedUser => {
        if (removedUser === 0) {
            return res.status(404).json({ message: "The user with the specified ID does not exist"})
        } else
        return res.status(200).json(removedUser);
    })
    .catch(() => res.status(500).json({ error: "The user could not be removed" }))
})

module.exports = router;