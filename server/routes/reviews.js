const mongoCollections = require("../config/mongoCollections");
const express = require("express");
const router = express.Router();
const data = require("../data");
const reviewData = data.reviews;
const restroomData = data.restrooms;
const restrooms = mongoCollections.restrooms;
const { ObjectId } = require("mongodb");

router
  .route("/:restroomId")
  .get(async (req, res) => {
    //code here for GET
    const id = req.params.restroomId;
    if (!id) {
      res.status(400).json({ error: `You must provide an id to search for` });
      return;
    }
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: `invalid id is given` });
      return;
    }
    try {
      await restroomData.getRestroomById(id);
    } catch (e) {
      res.status(404).json({ error: `Restroom by id not found` });
      return;
    }
    try {
      const allReviewsList = await reviewData.getAllReviews(id);
      if (allReviewsList.length == 0) {
        res.status(404).json({ error: `no review for this restroom` });
        return;
      }
      res.status(200).json(allReviewsList);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const userId = req.user._id;
    const id = req.params.restroomId;
    const reviewInfo = req.body;
    if (
      !reviewInfo.restroomId ||
      !reviewInfo.reviewText ||
      !reviewInfo.userId ||
      !reviewInfo.rating
    ) {
      res.status(400).json({ error: `the request body is not valid` });
      return;
    }
    try {
      checkString(reviewInfo.restroomId);
      checkString(reviewInfo.reviewText);
      checkString(reviewInfo.userId);
    } catch (e) {
      res
        .status(400)
        .json({ error: `Not valid! Input should be a non-empty string` });
      return;
    }
    if (!id) {
      res.status(400).json({ error: `You must provide an id to search for` });
      return;
    }
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: `invalid id is given` });
      return;
    }
    const restroomsCollection = await restrooms();
    const restroom = await restroomsCollection.findOne({ _id: ObjectId(id) });
    if (restroom === null) {
      res.status(404).json({ error: `Restroom by id not found` });
      return;
    }
    if (
      isNaN(reviewInfo.rating) ||
      reviewInfo.rating < 1 ||
      reviewInfo.rating > 5
    ) {
      res.status(400).json({ error: `invalid rating` });
      return;
    }
    const restroomData = await reviewData.createReview(
      reviewInfo.restroomId,
      reviewInfo.reviewText,
      userId,
      Number(reviewInfo.rating)
    );
    res.status(200).json(restroomData);
  });

router
  .route("/reviews/:reviewId")
  .get(async (req, res) => {
    //code here for GET
    const id = req.params.reviewId;
    if (!id) {
      res.status(400).json({ error: `You must provide an id to search for` });
      return;
    }
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: `invalid id is given` });
      return;
    }
    try {
      await reviewData.getReviewById(id);
    } catch (e) {
      res.status(404).json({ error: `review by id not found` });
      return;
    }
    try {
      const review = await reviewData.getReviewById(id);
      res.status(200).json(review);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    const id = req.params.reviewId;
    if (!id) {
      res.status(400).json({ error: `You must provide an id to search for` });
      return;
    }
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: `invalid id is given` });
      return;
    }
    try {
      await reviewData.getReviewById(id);
    } catch (e) {
      res.status(404).json({ error: `review by id not found` });
      return;
    }
    try {
      const restroom = await reviewData.removeReviewById(id);
      res.status(200).json(restroom);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

router.route("/reviews/user/:id").get(async (req, res) => {
  let queryRev = reviewData.getReviewsByUser(req.params.id);
  res.status(200).json(queryRev);
});

function checkString(input) {
  if (typeof input != "string" || input.trim().length == 0) {
    throw `Not valid! ${input} should be a non-empty string`;
  }
}

module.exports = router;
