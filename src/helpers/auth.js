const { User } = require('../db/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { mongoose } = require('../db');
const dotenv = require('dotenv').config()


//TODO: check that the data provided fits the Model.


/**
 * Register the new user
 */
const register = (req,res) => {
    const user = new User(req.body)
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.save((err, user) => {
        if(err) return res.status(400).send({message: err})
        return res.json({ token: jwt.sign({ user },  process.env.SECRET_KEY)});
        });
}


/**
 * sign in the user
 */
 const login = function(req, res) {
    User.findOne({
      username: req.body.username
    }).select('+password').exec(function(err, user) {
      if (err) throw err;
      if (!user || !(bcrypt.compareSync(req.body.password, user.password))) {
        return res.status(401).json({ message: 'Invalid user or password.' });
      }
          return res.json({ token: jwt.sign({user},  process.env.SECRET_KEY), user});
    });
  };


/**
 *  Check if the user is logged in
 */
 loginRequired = async function(req, res, next) {
    const token = req.header("auth-token");
    if (token){
        req.user = jwt.verify(token, process.env.SECRET_KEY).user;
        const exists = await User.exists({_id: mongoose.Types.ObjectId(req.user._id)});
        console.log('exists', exists)
        if(exists) next()
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
  };

/**
 * check if the user is an admin
 */
adminRequired = function(req, res, next) {
    const token = req.header("auth-token");
    if (token){
        req.user = jwt.verify(token, process.env.SECRET_KEY).user;
        User.findOne({_id: '60a7da9262350f387c39c917'},(err, user) => {
            if(user && user.admin) return next()
            return res.status(401).json({ message: 'Unauthorized user!' });
        });
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
  };

getUser = function(req, res) {
    const token = req.header("auth-token")
    console.log(token);
    if (token){
        req.user = jwt.verify(token, process.env.SECRET_KEY).user;
        
        User.findOne({_id: req.user._id}).populate('books').exec((err, user) => {
            console.log(user)
            if(user && user.admin) return res.status(200).send(user)
            return res.status(401).json({ message: 'Unauthorized user!' });
        });
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
}


module.exports = {
    register,
    login,
    adminRequired,
    loginRequired,
    getUser
}