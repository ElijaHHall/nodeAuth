module.exports = function(app, passport){
// home page with login-page /////////////
    app.get('/', function(req, res) {
        res.render('index.ejs'); //load the index.ejs file
    });

// Login ================
// =========================
// show the login-form
app.get('/login', function(req, res) {
    //render the page and pass in flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') })
});

// process the login-form
//app.post('/login', do all the passport stuff here)

// signup ==============
// =====================

app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') })
})


// process the signup form
// profile section needs to be protected 
// so you have to be logged in to visit

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user
    })
})


// Logout =============
app.get('/logout', function(req, res) {
    req.logout();
    req.redirect('/');
});

}

function isLoggedIn(req, res, next) {
    if( req.isAuthenticated())
    return next();

    res.redirect('/');
}