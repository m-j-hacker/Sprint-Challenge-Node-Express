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
    const newProject = { name, description };
    // if (req.body.completed) {
    //     newProject += { req.body.completed }
    // }
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

module.exports = router;