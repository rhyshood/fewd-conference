const confDAO = require("../models/confModel");
const conf = new confDAO({ filename: "conf.db", autoload: true });

exports.newList = function (req, res) {
  conf.init();
  res.redirect("/");
};

exports.listConf = function (req, res) {
  conf
    .getAllEntries()
    .then((list) => {
      res.json(list);
      console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.listAllSpeakers = function (req, res) {
  conf
    .getAllSpeakers()
    .then((list) => {
      res.json(list);
      console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.listAllTags = function (req, res) {
  conf
    .getAllTags()
    .then((list) => {
      res.json(list);
      console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.listSearchQuery = function (req, res) {
  let speakerName = req.params["speaker"];
  let sessionID = req.params["session"];
  let times = req.params["times"];
  let tags = req.params["tags"];
  let rating = req.params["rating"];
  conf
    .getSearchResults(speakerName, sessionID, times, tags, rating)
    .then((list) => {
      res.json(list);
     // console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.listOneSpeaker = function (req, res) {
  let speakerName = req.params["term"];
  conf
    .getSpeaker(speakerName)
    .then((list) => {
      res.json(list);
      console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.listSession = function (req, res) {
  let sessionName = req.params["term"];
  conf
    .getSession(sessionName)
    .then((list) => {
      res.json(list);
      console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.listTime = function (req, res) {
  let talkTime = req.params["term"];
  conf
    .getTime(talkTime)
    .then((list) => {
      res.json(list);
      console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.listRatingsBySpeaker = function (req, res) {
  let speakerName = req.params["speaker"];
  conf
    .getSpeaker(speakerName)
    .then((list) => {
      res.json(list[0].ratings);
      console.log("ratings: ", list[0].ratings);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.listRatingsById = function (req, res) {
  let talkId = req.params["id"];
  conf
    .getTalkById(talkId)
    .then((list) => {
      console.log(list)
      let arr = [];
      for (const id of Object.keys(list[0].ratings)) {
        arr.push(list[0].ratings[id])
      }
      res.json(arr)
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.getTalkById = function (req, res) {
  let talkId = req.params["id"];
  conf
    .getTalkById(talkId)
    .then((list) => {
      res.json(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.rateTalkById = function (req, res) {
  let talkId = req.params["id"];
  let newRating = req.params["rating"];
  let email = req.params["email"];

  conf
    .rateTalkById(talkId, newRating, email)
    .then(console.log("adding rating using params"))
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.getTalkRatingById = function (req, res) {
  let talkId = req.params["id"];
  let email = req.params["email"];

  conf
    .getTalkRatingById(talkId, email)
    .then((result) => res.json(result))
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.handlePosts = function (req, res) {
  let talkId = req.body.talkId;
  let newRating = req.body.rating;
  conf
    .rateTalk(talkId, newRating)
    .then(console.log("rating added"))
    .catch((err) => {
      console.log("promise rejected", err);
    });
};
