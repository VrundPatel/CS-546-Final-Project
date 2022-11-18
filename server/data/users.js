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
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(id) });
  if (user === null) throw 'Error: No user with that id';
  user._id = user._id.toString();
  return user;
};

// TODO: Encrypt password
// TODO: Check for existing user via email
const createUser = async ({ fullName, city, state, email, password }) => {
  const userCollection = await users();
  const insertInfo = await userCollection.insertOne({ fullName, city, state, email, password });
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add user';
  return getUserById(insertInfo.insertedId.toString());
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser
}