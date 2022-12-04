const mongoCollections = require("../config/mongoCollections");
const navigator = require("navigator");
const {ObjectId} = require("mongodb");
const restrooms = mongoCollections.restrooms;

console.log(navigator.geolocation.getCurrentPosition(showPosition));