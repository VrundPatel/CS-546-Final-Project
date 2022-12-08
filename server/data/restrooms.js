const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require("mongodb");
const restrooms = mongoCollections.restrooms;

const getAllRestrooms = async () => {
  const restroomCollection = await restrooms();
  const restroomList = await restroomCollection.find({}).toArray();
  return restroomList;
};

const getRestroomById = async (id) => {
  //TODO: ID validation
  const restroomCollection = await restrooms();
  const restroom = await restroomCollection.findOne({ _id: ObjectId(id) });
  if (restroom === null) throw "Error: No restroom with that id";
  restroom._id = restroom._id.toString();
  return restroom;
};

async function insertRestroom(restroom) {
  const restroomCollection = await restrooms();
  const insertedRR = await restroomCollection.insertOne(restroom);
  if (!insertedRR.acknowledged || !insertedRR.insertedId) {
    return "500|Could not add restroom";
  }
  return insertedRR.insertedId;
}

module.exports = {
  getAllRestrooms,
  getRestroomById,
  insertRestroom,
};
