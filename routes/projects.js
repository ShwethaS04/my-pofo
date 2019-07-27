const express = require('express');
const router = express.Router();
const data = require('../my-data')


router.get('/', function(req,res) {
    res.render('projects', {
        layout:'layout',
        title:'Projects',
        projects: data.myProjects,
        hasNavProject : true
    })
});



router.get('/:alias', function(req,res) {
    let alias = req.params.alias;
    let index = data.projectIndex[alias];
    let project = data.myProjects[index];
    res.render('project-detail', {
        title : 'Project',
        projectDetail: project
    })   
})


module.exports = router;