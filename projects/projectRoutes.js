const express = require('express');

const router = express.Router();

const projectDb = require('../data/helpers/projectModel.js');

router.post('/', (req, res) => {
    console.log(req.body);
    
})

module.exports = router;