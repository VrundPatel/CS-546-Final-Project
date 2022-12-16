const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const restrooms = mongoCollections.restrooms;
const users = mongoCollections.users;
const userData = require("./users");
const { ObjectId } = require("mongodb");
const restroomsData = require("./restrooms");

const createReview = async (restroomId, reviewText, userId, rating) => {
  if (!restroomId || !reviewText || !userId || !rating) {
    throw `All fields need to have valid values`;
  }
  checkString(restroomId);
  checkString(reviewText);
  checkString(userId);
  if (!ObjectId.isValid(restroomId)) {
    throw `id is not a valid ObjectId`;
  }
  const restroomsCollection = await restrooms();
  const restroom = await restroomsCollection.findOne({
    _id: ObjectId(restroomId),
  });
  if (restroom === null) {
    throw `No restroom with that id`;
  }
  if (isNaN(rating) || rating < 1 || rating > 5) {
    throw "rating must be a number in range from 1-5";
  }
  const restroomThatReviewed = await restroomsData.getRestroomById(restroomId);
  //const userThatReviewed = await usersData.getUserById(userId);
  let user = await userData.getUserById(userId);
  const reviewId = ObjectId();
  const newReview = {
    _id: reviewId,
    restroomId: restroomId,
    reviewText: reviewText,
    userId: userId,
    userName: user.user.fullName,
    rating: rating,
  };

  let updatedReviews = [];
  for (let i = 0; i < restroomThatReviewed.reviews.length; i++) {
    updatedReviews[i] = restroomThatReviewed.reviews[i];
  }
  updatedReviews[restroomThatReviewed.reviews.length] = newReview;
  let newOverallRating = (
    (restroomThatReviewed.overallRating * (updatedReviews.length - 1) +
      newReview.rating) /
    updatedReviews.length
  ).toFixed(1);
  await restroomsCollection.updateOne(
    { _id: ObjectId(restroomId) },
    { $set: { reviews: updatedReviews } }
  );
  await restroomsCollection.updateOne(
    { _id: ObjectId(restroomId) },
    { $set: { overallRating: newOverallRating } }
  );

  const usersCollection = await users();
  await usersCollection.updateOne(
    { _id: ObjectId(userId) },
    { $push: { reviewIds: String(newReview._id) } }
  );
  return await restroomsData.getRestroomById(restroomId);
};

const getAllReviews = async (restroomId) => {
  if (!restroomId) {
    throw `You must provide an restroom id to search for`;
  }
  checkString(restroomId);
  if (!ObjectId.isValid(restroomId)) {
    throw `id is not a valid ObjectId`;
  }
  const restroomsCollection = await restrooms();
  const restroom = await restroomsCollection.findOne({
    _id: ObjectId(restroomId),
  });
  if (restroom === null) {
    throw `No restroom with that id`;
  }
  const restroomData = await restroomsData.getRestroomById(restroomId);
  let reviewList = [];
  for (let i = 0; i < restroomData.reviews.length; i++) {
    reviewList.push(restroomData.reviews[i]);
  }
  return reviewList;
};

const getReviewById = async (reviewId) => {
  if (!reviewId) {
    throw `You must provide an review id to search for`;
  }
  checkString(reviewId);
  if (!ObjectId.isValid(reviewId)) {
    throw `id is not a valid ObjectId`;
  }
  const restroomsCollection = await restrooms();
  const restroomsList = await restroomsCollection.find({}).toArray();
  let found = false;
  let review = {};
  for (let i = 0; i < restroomsList.length; i++) {
    const currentRestroom = restroomsList[i];
    for (let j = 0; j < currentRestroom.reviews.length; j++) {
      if (currentRestroom.reviews[j]._id.toString() == reviewId) {
        found = true;
        review = currentRestroom.reviews[j];
        break;
      }
    }
  }
  if (!found) {
    throw `no review with that id`;
  }
  return review;
};

const removeReviewById = async (reviewId) => {
  if (!reviewId) {
    throw `You must provide an review id to search for`;
  }
  checkString(reviewId);
  if (!ObjectId.isValid(reviewId)) {
    throw `id is not a valid ObjectId`;
  }
  const restroomsCollection = await restrooms();
  const restroomsList = await restroomsCollection.find({}).toArray();
  let found = false;
  let index = 0;
  let newReviewsList = [];
  let currentRestroom = {};
  for (let i = 0; i < restroomsList.length; i++) {
    currentRestroom = restroomsList[i];
    for (let j = 0; j < currentRestroom.reviews.length; j++) {
      if (currentRestroom.reviews[j]._id.toString() == reviewId) {
        found = true;
        for (let m = 0; m < currentRestroom.reviews.length; m++) {
          if (currentRestroom.reviews[m]._id.toString() == reviewId) {
            index = m;
            continue;
          }
          newReviewsList.push(currentRestroom.reviews[m]);
        }
        break;
      }
    }
  }
  if (found == false) {
    throw `no review with that id (Could not remove)`;
  }
  let newOverallRating;
  if (newReviewsList.length === 0) {
    newOverallRating = 0;
  } else {
    newOverallRating = (
      (currentRestroom.overallRating * (newReviewsList.length + 1) -
        currentRestroom.reviews[index].rating) /
      newReviewsList.length
    ).toFixed(1);
  }

  await restroomsCollection.updateOne(
    { _id: ObjectId(currentRestroom._id) },
    { $set: { reviews: newReviewsList } }
  );
  await restroomsCollection.updateOne(
    { _id: ObjectId(currentRestroom._id) },
    { $set: { overallRating: newOverallRating } }
  );
  const curReview = await this.getReview(reviewId);
  const usersCollection = await users();
  await usersCollection.updateOne(
    { _id: ObjectId(curReview.userId) },
    { $pull: { reviewIds: reviewId } }
  );
  return await restroomsData.getRestroomById(currentRestroom._id.toString());
};

const updateReviewById = async (reviewId, updatedReview) => {
  if (!reviewId) {
    throw `You must provide an review id to search for`;
  }
  checkString(reviewId);
  if (!ObjectId.isValid(reviewId)) {
    throw `id is not a valid ObjectId`;
  }
  const reviewCollection = await reviews();
  const updatedReviewData = {};
  if (updatedReview.reviewText) {
    updatedReviewData.reviewText = updatedReview.reviewText;
  }

  if (updatedReview.rating) {
    updatedReviewData.rating = updatedReview.rating;
  }

  await reviewCollection.updateOne(
    { _id: ObjectId(reviewId) },
    { $set: updatedReviewData }
  );
  return await this.getReviewById(reviewId);
};

function checkString(input) {
  if (typeof input != "string" || input.trim().length == 0) {
    throw `Not valid! ${input} should be a non-empty string`;
  }
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  removeReviewById,
  updateReviewById,
};
