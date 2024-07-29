// services/userService.js
const db = require('../models');
const User = db.user;

exports.createUser = async (userData) => {
    const { name, email, password } = userData;
    return await User.create({ name, email, password });
};

exports.getAllUsers = async () => {
    return await User.findAll();
};

exports.getUserById = async (id) => {
    return await User.findByPk(id);
};
