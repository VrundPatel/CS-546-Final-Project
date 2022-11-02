const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const users = mongoCollections.users;

const getAllUsers = async () => {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    return userList;
}

const getUserById = async (id) => {
    //TODO: ID validation
    const userCollection = await restrooms();
    const user = await userCollection.findOne({_id: ObjectId(id)});
    if (user === null) throw 'Error: No movie with that id';
    user._id = user._id.toString();
    return user;
};

module.exports = {
    getAllUsers,
    getUserById
}