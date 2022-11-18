const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const users = mongoCollections.users;

const getAllUsers = async () => {
  const userCollection = await users();
  const userList = await userCollection.find({}).toArray();
  return userList;
}

const getUserById = async (id) => {
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(id) });
  if (user === null) throw 'Error: No user with that id';
  return user._id.toString();
};

const getUserByEmail = async (input) => {
  const userCollection = await users();
  const user = await userCollection.findOne({ email: input });
  return user;
};

// TODO: Encrypt password before saving
const createUser = async ({ fullName, city, state, email, password }) => {
  email = email.toLowerCase();
  const userCollection = await users();
  const userFound = await getUserByEmail(email)
  if (!!userFound) {
    throw 'User already exists';
  }
  const insertInfo = await userCollection.insertOne({ fullName, city, state, email, password });
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add user';
  return getUserById(insertInfo.insertedId.toString());
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  getUserByEmail
}