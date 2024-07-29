// controllers/userController.js
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const db = require('../models');
const { default: AsyncQueue } = require('sequelize/lib/dialects/mssql/async-queue');
const User = db.user;

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json(newUser);
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            next(createError(400, 'Email already in use'));
        } else {
            next(createError(500, 'Failed to create user'));
        }
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users)
    } catch (err) {
        next(createError(500, 'Failed to retrieve users'));
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const user = await User.findByPk(userID);
        if (!user){
            return next(createError(404, 'User not found'));
        }
        res.json(user)
    } catch (err) {
        next(createError(500, 'Failed to retrieve user'));
    }
}