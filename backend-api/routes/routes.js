const express = require("express");
const router = express.Router();
const talkControllers = require("../controllers/talkControllers");
const accountControllers = require("../controllers/accountControllers");


// router.get("/setup", controller.newList);


// Routes relating to Talk Info
router.get("/talks", talkControllers.listConf);
router.get('/talks/speaker/:term', talkControllers.listOneSpeaker);
router.get('/talks/session/:term', talkControllers.listSession);
router.get('/talks/time/:term', talkControllers.listTime);
router.get('/talks/:speaker/rating', talkControllers.listRatingsBySpeaker);
router.get('/talks/id/:id/', talkControllers.getTalkById);
router.get('/talks/:id/ratingById', talkControllers.listRatingsById);
router.get('/talks/speaker/:speaker/session/:session/times/:times/tags/:tags/rating/:rating', talkControllers.listSearchQuery);
router.get('/talks/rate/:id/:rating/:email', talkControllers.rateTalkById)
router.get('/talks/speakers', talkControllers.listAllSpeakers)
router.get('/talks/tags', talkControllers.listAllTags)
router.post('/talks/posts', talkControllers.handlePosts)

//  Routes relating to Account
router.get('/account/login/email/:email/password/:pass', accountControllers.checkPassword)
router.post('/account/create', accountControllers.createNewAccount)
router.get('/account/savedID/email/:email', accountControllers.fetchSavedIDs)
router.get('/account/addSavedID/email/:email/id/:id', accountControllers.addToSaved)
router.get('/account/removeSavedID/email/:email/id/:id', accountControllers.removeFromSaved)
router.get('/account/itinerary/email/:email/', accountControllers.fetchItineraryID)
router.get('/account/addItinerary/email/:email/id/:id/talkTime/:time', accountControllers.addToItinerary)
router.get('/account/removeItinerary/email/:email/id/:id/talkTime/:time', accountControllers.removeFromItinerary)

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
