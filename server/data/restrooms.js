const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const restrooms = mongoCollections.restrooms;

const getAllRestrooms = async () => {
  const restroomCollection = await restrooms();
  const restroomList = await restroomCollection.find({}).toArray();
  return restroomList;
}

module.exports = {
  getAllRestrooms
}