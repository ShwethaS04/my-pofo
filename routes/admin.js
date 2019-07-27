const express = require('express');
const router = express.Router();
const data = require('../my-data')


router.get('/', (req,res) => {
    res.render('admin/index', {
        title: 'Admin',
        layout:'admin-layout'
    })
});



router.get('/projects', (req,res) => {
    res.render('admin/projects', {
        title: 'Project List',
        layout:'admin-layout',
        projects: data.myProjects
    })
})



router.get('/projects/create-new', (req,res) => {
    res.render('admin/create-project', {
        title:'Create Project',
        layout: 'admin-layout'
    })
})


router.post('/projects/create-new', (req,res) => {
    let bodyData = req.body;

    let project = bodyData;


    project.alias = bodyData.name.split(' ').join('-').toLowerCase();
    res.redirect('/admin/projects');

    // let projectCollection = db.collection('projects');


    // projectCollection.insertOne(project, function(err,data) {
    //     if(err) {
    //         console.log(err)
    //         next(err);

    //     }else {
    //         console.log('data created')
          
    //         res.redirect('/admin/projects');
    //     }
    // })
})



router.get('/projects/:alias', (req,res) =>{
    let alias = req.params.alias;

    let index = data.projectIndex[alias];
    let project = data.myProjects[index];


    res.render('admin/projectDetail', {
        title: 'Project Detail',
        layout:'admin-layout',
        project:project
    })
})

module.exports = router;
