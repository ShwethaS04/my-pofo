const express = require('express');
const hbs = require('hbs');
const routes = require('./routes/index');
const session = require('express-session');
const errorHandlers = require('./middlewares/error-handlers');
const appMiddleware = require('./middlewares/app-middleware')
const app = express();

app.set('views',__dirname+'/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials')


//static middleware
app.use(session({
    secret:'myappsecret',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge:60000}
    //cookie: {maxAge:60000, secure:true}
}))
app.use(express.static(__dirname+'/static'))
app.use(appMiddleware.logger);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(appMiddleware.authenticated)

//setup the app.js
app.get('/', routes.index);
app.get('/projects', routes.project);
app.get('/projects/:alias', routes.projectDetail);

app.get('/blog', routes.blog);
app.get('/about', routes.about);
app.get('/resume', routes.resume);
app.get('/contact', routes.contact);

app.get('/admin', appMiddleware.authenticate, routes.admin);

app.get('/admin/projects', appMiddleware.authenticate, routes.adminProjects);
// This path is for get the data
app.get('/admin/projects/create-new', appMiddleware.authenticate, routes.createProject);
// This path is for post the data
app.post('/admin/projects/create-new', appMiddleware.authenticate, routes.docreateProject);

//app.get('/admin/projects/:alias', appMiddleware.authenticate, routes.project-details);

app.get('/admin/project');

app.get('/signin', routes.signin);
app.post('/signin', routes.doSignin);
app.get('/signout', routes.signout);



//setup middleware
app.use(errorHandlers.notFound);
app.use(errorHandlers.handleError);



app.listen(3000, () => console.log('Server up n running on port 3000'))