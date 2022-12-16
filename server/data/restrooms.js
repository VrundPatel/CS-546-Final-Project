const mongoCollections = require("../config/mongoCollections");
const { Navigator } = require("node-navigator");
const navigator = new Navigator();
const validation = require("../validation");
const geoCoding = require("../goecoding");
const { ObjectId } = require("mongodb");
const restrooms = mongoCollections.restrooms;

const createRestroom = async (
  streetAddress,
  city,
  state,
  zipCode,
  openingHours,
  closingHours,
  tags
) => {
  if (
    !streetAddress ||
    !city ||
    !state ||
    !zipCode ||
    !openingHours ||
    !closingHours ||
    !tags
  ) {
    throw `All fields need to have valid values`;
  }
  checkString(streetAddress);
  checkString(city);
  checkString(state);
  checkString(zipCode);
  checkString(openingHours);
  checkString(closingHours);
  //checkArrays(tags); Tags should be able to be empty

  let geoCode = await geoCoding.getCoords(
    streetAddress + " " + city + " " + state + " " + zipCode
  );

  const restroomsCollection = await restrooms();
  let newRestroom = {
    streetAddress: streetAddress,
    city: city,
    state: state,
    zipCode: zipCode,
    overallRating: 0,
    openingHours: openingHours,
    closingHours: closingHours,
    loc: geoCode.geometry,
    tags: tags,
    reviews: [],
    reports: [],
    lastUpdated: Date.now(),
  };
  const insertInfo = await restroomsCollection.insertOne(newRestroom);
  if (insertInfo.insertedCount === 0) {
    throw `could not add restroom`;
  }

  const newId = insertInfo.insertedId;
  const restroom = await getRestroomById(newId.toString());
  restroom._id = restroom._id.toString();
  return restroom;
};

const getAllRestrooms = async () => {
  const restroomCollection = await restrooms();
  const restroomList = await restroomCollection.find({}).toArray();
  return restroomList;
};

const getRestroomById = async (id) => {
  //TODO: ID validation
  if (!id) {
    throw `You must provide an id to search for`;
  }
  checkString(id);
  if (!ObjectId.isValid(id)) {
    throw `id is not a valid ObjectId`;
  }
  const restroomCollection = await restrooms();
  const restroom = await restroomCollection.findOne({ _id: ObjectId(id) });
  if (restroom === null) throw "Error: No restroom with that id";
  restroom._id = restroom._id.toString();
  return restroom;
};

const searchRestroomsByTerm = async (searchTerm) => {
  searchTerm = validation.checkString(searchTerm, "Search term(s)");
  const restroomCollection = await restrooms();
  const restroomList = await restroomCollection.find({
    $text: { $search: searchTerm },
  });
  return restroomList;
};

const searchRestroomsByLocation = async (lat, long) => {
  const restroomCollection = await restrooms();
  const restroomList = await restroomCollection.find({
    loc: {
      $near: {
        $geometry: { type: "Point", coordinates: [long, lat] },
        $minDistance: 0,
        $maxDistance: 33000
      },
    },
	});

  return restroomList;
};

const removeRestroomById = async (id) => {
  if (!id) {
    throw `You must provide an id to search for`;
  }
  checkString(id);
  if (!ObjectId.isValid(id)) {
    throw `id is not a valid ObjectId`;
  }
  const restroomsCollection = await restrooms();
  const restroom = await getRestroomById(id);
  const deletionInfo = await restroomsCollection.deleteOne({
    _id: ObjectId(id),
  });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete restroom with id of ${id}`;
  }
  return restroom._id + " has been successfully deleted!";
};

const updateRestroom = async (
  id,
  streetAddress,
  city,
  state,
  zipCode,
  openingHours,
  closingHours,
  availability,
  ammenities
) => {
  if (
    !id ||
    !streetAddress ||
    !city ||
    !state ||
    !zipCode ||
    !openingHours ||
    !closingHours ||
    !availability ||
    !ammenities
  ) {
    throw `All fields need to have valid values`;
  }
  checkString(id);
  checkString(streetAddress);
  checkString(city);
  checkString(state);
  checkString(zipCode);
  checkString(openingHours);
  checkString(closingHours);
  checkArrays(availability);
  checkArrays(ammenities);
  if (!ObjectId.isValid(id)) {
    throw `id is not a valid ObjectId`;
  }

  let updatedRestroom = {
    streetAddress: streetAddress,
    city: city,
    state: state,
    zipCode: zipCode,
    overallRating: 0,
    openingHours: openingHours,
    closingHours: closingHours,
    availability: availability,
    ammenities: ammenities,
  };
  const restroomsCollection = await restrooms();
  await restroomsCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: updatedRestroom }
  );
  return await restroomsCollection.findOne({ _id: ObjectId(id) });
};

function checkString(input) {
  if (typeof input != "string" || input.trim().length == 0) {
    throw `Not valid! ${input} should be a non-empty string`;
  }
}

function checkArrays(input) {
  if (!Array.isArray(input) || input.length === 0) {
    throw `${input} should not be a non-empty array`;
  }
  for (i = 0; i < input.length; i++) {
    if (typeof input[i] != "string" || input[i].trim().length === 0) {
      throw `${input} should not have empty string elements`;
    }
  }
}

module.exports = {
  getAllRestrooms,
  getRestroomById,
  searchRestroomsByTerm,
  searchRestroomsByLocation,
  removeRestroomById,
  createRestroom,
  updateRestroom,
};
