const userCtrl = {};
const passport = require('passport');
const User = require('../models/User');


userCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};
userCtrl.signup = async (req, res) => {
    const errors = [];
    const {firstname, lastname, email, phone, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text: 'Paswords do not match'});
    }
    if(password.length < 4){
        errors.push({text: 'Passwords must be at least 4 characters'});
    }
    if(errors.length >0 ){
        res.render('users/signup', {
            errors,
            firstname, lastname, email, phone
        });
    }else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
          errors.push({text: 'The email is already in use.'})
        }
        if(emailUser){
          res.render('users/signup', {
            errors, firstname, lastname, phone
          });
          
        }else{
            const newUser = new User({firstname, lastname, email, phone, password});
            newUser.password= await newUser.encryp(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/signin')
        }
    }
};
userCtrl.renderSignInForm = (req, res) => {
  res.render('users/signin');
};
userCtrl.signin = passport.authenticate('local', {
  failureRedirect: '/users/signin',
  successRedirect: '/notes',
  failureFlash: true
});
userCtrl.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out now');
  res.redirect('/users/signin')
};
module.exports = userCtrl;
