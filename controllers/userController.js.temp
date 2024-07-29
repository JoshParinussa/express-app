// controllers/userController.js
const createError = require('http-errors');
const { getUsersFromDB, getUserFromDB, createUserInDB } = require('../models/userModel');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await getUsersFromDB();
        res.json(users);
    } catch (err) {
        next(createError(500, 'Failed to fetch users'));
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await getUserFromDB(userId);
        if (!user) {
            return next(createError(404, 'User not found'));
        }
        res.json(user);
    } catch (err) {
        next(createError(500, 'Failed to fetch user'));
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const newUser = req.body;
        const createdUser = await createUserInDB(newUser);
        res.status(201).json(createdUser);
    } catch (err) {
        next(createError(500, 'Failed to create user'));
    }
};