// controllers/userController.js
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const userService = require('../services/userServices');

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await userService.createUser({ name, email, password: hashedPassword });

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
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        next(createError(500, 'Failed to retrieve users'));
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        if (!user) {
            return next(createError(404, 'User not found'));
        }
        res.json(user);
    } catch (err) {
        next(createError(500, 'Failed to retrieve user'));
    }
};
