const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const users = mongoCollections.users;

const getAllUsers = async () => {
  const userCollection = await users();
  const userList = await userCollection.find({}).toArray();
  return userList;
}

const getUserById = async (id) => {
  if (!id) {
    throw `You must provide an id to search for`;
  }
  checkString(id);
  if (!ObjectId.isValid(id)) {
    throw `id is not a valid ObjectId`;
  }
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(id) });
  if (user === null) throw 'Error: No user with that id';
  return user;
};

const getUserByEmail = async (input) => {
  const userCollection = await users();
  const user = await userCollection.findOne({ email: input });
  return user;
};

const createUser = async ({ fullName, city, state, email, password }) => {
  const reviewIds = [], reportIds = [];
  email = email.toLowerCase();
  const userCollection = await users();
  const userFound = await getUserByEmail(email)
  if (!!userFound) {
    throw 'User already exists';
  }
  const insertInfo = await userCollection.insertOne({ fullName, city, state, email, password, reviewIds, reportIds });
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add user';
  return getUserById(insertInfo.insertedId.toString());
};

const updateUser = async (id, updateInfo) => {
  if (!id) {
    throw `id is missing, should input the id your want to update`;
  }
  if (!updateInfo) {
    return await this.getUserById(id);
  }
  checkString(id);
  const userCollection = await users();
  let updatedUserData = {};
  let gotten = await this.getUserById(id);
  if (JSON.stringify(updateInfo) == JSON.stringify(gotten)) {
    return await this.getUserById(id);
  }

  if (updateInfo.firstName) {
    updatedUserData.fisrtName = updateInfo.firstName;
  }
  if (updateInfo.lastName) {
    updatedUserData.lastName = updateInfo.lastName;
  }
  if (updateInfo.city) {
    updatedUserData.city = updateInfo.city;
  }
  if (updateInfo.state) {
    updatedUserData.state = updateInfo.state;
  }
  if (updateInfo.zipCode) {
    updatedUserData.zipCode = updateInfo.zipCode;
  }
  if (updateInfo.email) {
    updatedUserData.email = updateInfo.email;
  }
  if (updateInfo.hashedPassword) {
    updatedUserData.hashedPassword = updateInfo.hashedPassword;
  }

  if (updatedUserData == {}) {
    return await this.getUserById(id);
  }
  const updateUserInfo = await userCollection.updateOne({ _id: id }, { $set: updatedUserData });
  if (updateUserInfo.modifiedCount === 0 && updateUserInfo.deletedCount === 0) {
    throw `could not update user`;
  }
  return await this.getUserById(id);
};

function checkString(input) {
  if (typeof input != 'string' || input.trim().length == 0) {
    throw `Not valid! ${input} should be a non-empty string`;
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  getUserByEmail,
  updateUser
}