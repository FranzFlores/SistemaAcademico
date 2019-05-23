module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('OK', 'Se necesita primeramente iniciar sesión.', '/login');
    }
};