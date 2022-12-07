const mongoCollections = require('../config/mongoCollections');
const navigator = require("navigator");
const validation = require("../validation");
const { ObjectId } = require('mongodb');
const restrooms = mongoCollections.restrooms;

const getAllRestrooms = async () => {
  const restroomCollection = await restrooms();
  const restroomList = await restroomCollection.find({}).toArray();
  return restroomList;
};

const getRestroomById = async (id) => {
    //TODO: ID validation
    const restroomCollection = await restrooms();
    const restroom = await restroomCollection.findOne({_id: ObjectId(id)});
    if (restroom === null) throw 'Error: No restroom with that id';
    restroom._id = restroom._id.toString();
    return restroom;
};

const searchRestroomsByTerm = async (searchTerm) => {
    searchTerm = validation.checkString(searchTerm, "Search term(s)");
    const restroomCollection = await restrooms();
    // const restroomList = await restroomCollection.find({$text: {$search: searchTerm}});
    const restroomList = await restroomCollection.find({$text: {$search: searchTerm}});
    // console.log(restroomList.toArray(function(err, results){
    //     console.log(results);
    // }));
    return restroomList;
  };

const searchRestroomsByLocation = async () => {
    console.log(navigator.geolocation.getCurrentPosition(showPosition));
}

module.exports = {
  getAllRestrooms,
  getRestroomById,
  searchRestroomsByTerm,
  searchRestroomsByLocation
}