module.exports.logger = function(req,res,next){
    console.log(req.method, req.url);
    next();
}

module.exports.authenticate = function(req,res, next) {
    if(req.session.isLoggedIn) {
        next()
    } else{
        res.redirect('/signin')
    }
}

//If user is logged in send user info to view
module.exports.authenticated = function(req,res,next) {
    if(req.session.isLoggedIn) {
        res.locals.user = req.session.user;
        next();
    }else {
        next()
    }
}