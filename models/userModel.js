// models/userModel.js
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

exports.getUsersFromDB = async () => {
    return users;
};

exports.getUserFromDB = async (id) => {
    return users.find(user => user.id === parseInt(id));
};

exports.createUserInDB = async (user) => {
    user.id = users.length + 1;
    users.push(user);
    return user;
};