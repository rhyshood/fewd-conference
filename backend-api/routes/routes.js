const express = require("express");
const router = express.Router();
const talkControllers = require("../controllers/talkControllers");


// router.get("/setup", controller.newList);

router.get("/talks", talkControllers.listConf);
router.get('/talks/speaker/:term', talkControllers.listOneSpeaker);
router.get('/talks/session/:term', talkControllers.listSession);
router.get('/talks/time/:term', talkControllers.listTime);
router.get('/talks/:speaker/rating', talkControllers.listRatingsBySpeaker);
router.get('/talks/:id/ratingById', talkControllers.listRatingsById);
router.get('/talks/speaker/:speaker/session/:session/times/:times/tags/:tags/rating/:rating', talkControllers.listSearchQuery);
router.get('/talks/rate/:id/:rating', talkControllers.rateTalkById)
router.get('/talks/speakers', talkControllers.listAllSpeakers)
router.get('/talks/tags', talkControllers.listAllTags)
router.post('/talks/posts', talkControllers.handlePosts)

router.use(function (req, res) {
  res.status(404);
  res.type("text/plain");
  res.send("404 Not found.");
});

router.use(function (err, req, res, next) {
  res.status(500);
  res.type("text/plain");
  res.send("Internal Server Error.");
});

module.exports = router;
