const data = require('../my-data.js')
const MongoClient = require('mongodb').MongoClient;

// Specify the mongodb url
const dbUrl  = 'mongodb://localhost:27017';

let db;

//to connect mongodb connect()
//MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, data)
MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, client){
    if(err) {
        console.log(err);
    }else {
        console.log('Successfully connected to DB');
        // connecting to the batch-3 db
        db = client.db('batch-3');
    }
})
// module.exports.index = function(req,res){
//     res.render('index', {title:'My Portfolio',
//     hasNavHome:true
//     })
// }

module.exports.index = function(req,res){
    //console.log('sess obj', req.session);

    // if(req.session.isLoggedIn) {
    //     var usrData = req.session.user
    // }

    res.render('index', {title:'My Portfolio',
    hasNavHome:true
    //usr: usrData
    })
}

module.exports.project = function(req, res, next){
    //connecting to our collections users
    //let usrCollection = db.collection('users');
    let projectCollection = db.collection('projects');

    //usrCollection.find().toArray((err,data)
    projectCollection.find().toArray((err,data) => {
        if(err){
            console.log(err);
            next(err);
        } else {
            //console.log('User Data');
            console.log('Project Data');
            console.log(data);
            
            
    res.render('projects', {
        layout:'layout',
        title:'Projects',
        projects:data,
        hasNavProject:true
    })
        }
    })


    // res.render('projects', {
    //     layout:'layout',
    //     title:'Projects',
    //     projects:data.myProjects,
    //     hasNavProject:true
    // })
}

module.exports.createProject = function(req, res) {
    res.render('admin/create-project', {
        title: 'Create Project',
        layout : 'admin-layout'
    })
}

//module.exports.docreateProject = function(req, res)
module.exports.docreateProject = function(req, res, next) {
    
    let bodyData = req.body;

    let project = bodyData;

    project.alias = bodyData.name.split(' ').join('-').toLowerCase();

    let projectCollection = db.collection('projects');

    projectCollection.insertOne(project, function(err,data){
        if(err) {
            console.log(err);
            next(err);
        }
        else{
            console.log('data created');
            res.redirect('/admin/projects');
        }
    })

    // console.log(bodyData);
    // console.log('Do create projects');
    // res.redirect('/admin/projects')
}
// module.exports.project = function(req,res){
//     console.log(req.session);
//     console.log(data.myProjects);
//     res.render('projects', {
//         layout:'layout',
//         title:'Projects',
//         projects:data.myProjects,
//         hasNavProject:true
//     })
// }

module.exports.projectDetail = function(req,res){

    let alias = req.params.alias;
    let index = data.projectIndex[alias];
    let project = data.myProjects[index];
   // console.log(project)
    //console.log(req.params.alias)
    res.render('project-details', {
        title:'Project',
        projectDetails: project
    })

    // console.log(data.params.alias);
    // let index = data.projectIndex[req.params.alias];
    // console.log(index)
    // res.render('project-details', {      
    //     title:'Project',
    //     projects:data.myProjects[index]
    
}


module.exports.about = function(req,res){    
    res.render('about', {
        title:'About',
        hasNavAbout:true
    })
}


module.exports.blog = function(req,res){    
    res.render('blog', {
        title:'Blog',
        hasNavBlog:true
    })
}

module.exports.resume = function(req,res){    
    res.render('resume', {
        title:'Resume',
        hasNavResume:true
    })
}

module.exports.contact = function(req,res){    
    res.render('contact', {
        title:'Contact',
        hasNavContact:true
    })
}

module.exports.signin = function(req,res){    
    res.render('signin', {
        layout:'signin-layout',
        title:'SignIn'
    })
}

let users = [
    {email:'test@test.com', password:'test'},
    {email:'abc@test.com', password:'abc'}
]

module.exports.doSignin = (req,res, next) => {  
    
    let bodyData = req.body;

    console.log(bodyData);
    // let usr = users.filter(e => e.email === body.email)
    let usr = users.filter(e => e.email === bodyData.email)[0];

    console.log(usr);
    
    if(usr.password === bodyData.password) {
        // res.render('admin', {
        //     title:'Admin'
        // })
        req.session.user = usr;
        req.session.isLoggedIn = true;

        res.redirect('/admin')
    } else{
        next(new Error('Password is wrong'))
    }
    
    // res.render('admin', {
    //     title:'Admin'
    // })
}

// module.exports.admin = (req,res) => {
//     res.render('admin', {
//         title:'Admin'
//     })
// }

module.exports.admin = (req,res) => {
    res.render('admin/index', {
        title:'Admin',
        layout:'admin-layout'
    })
}

module.exports.signout = (req,res) => {
    req.session.isLoggedIn = false;
    req.session.user = {};

    res.redirect('/');
}

module.exports.adminProjects = (req,res) => {
    res.render('admin/projects', {
        title:'Project List',
        layout: 'admin-layout',
        projects:data.myProjects
    })
}


// module.exports.signin = (req,res) =>{    
//     res.render('signin', {
//         title:'SignIn'
//     })
// }
// module.exports.admin = function(req,res){    
//     res.render('admin', {
//         title:'Admin',
//         hasNavAdmin:true
//     })
// }