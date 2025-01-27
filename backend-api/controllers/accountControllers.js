const accountDAO = require("../models/accountModel");
const account = new accountDAO({ filename: "account.db", autoload: true });

exports.createNewAccount = function (req, res) {
    let fName = req.body.fName;
    let lName = req.body.lName;
    let email = req.body.email;
    let password = req.body.password;
  
    account
      .createNewAccount(fName, lName, email, password)
      .then(() =>{
        res.json({"message":"Account Created"});
      }).catch((err) => {
        res.json({"message":err});
      });
  };

  exports.checkPassword = function (req, res) {
    let email = req.params["email"];
    let pass = req.params["pass"];
    account
      .checkPassword(email, pass)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json({"message":err});
      });
  };

  exports.fetchSavedIDs = function (req, res) {
    let email = req.params["email"];
    account
      .fetchSavedIDs(email)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json({"message":err});
      });
  };

  exports.addToSaved = function (req, res) {
    let talkId = req.params["id"];
    let email = req.params["email"];
  
    account
      .addToSaved(email, talkId)
      .then((result) => {res.json(result)})
      .catch((err) => {
        res.json({"message":err});
      });
  };

  exports.removeFromSaved = function (req, res) {
    let talkId = req.params["id"];
    let email = req.params["email"];
  
    account
      .removeFromSaved(email, talkId)
      .then((result) => {res.json(result)})
      .catch((err) => {
        res.json({"message":err});
      });
  };

  exports.removeFromItinerary = function (req, res) {
    let talkId = req.params["id"];
    let email = req.params["email"];
    let talkTime = req.params["time"];
  
    account
      .removeFromItinerary(email, talkId, talkTime)
      .then((result) => {res.json(result)})
      .catch((err) => {
        res.json({"message":err});
      });
  };

  exports.addToItinerary = function (req, res) {
    let talkId = req.params["id"];
    let email = req.params["email"];
    let talkTime = req.params["time"];
    account
      .addToItinerary(email, talkId, talkTime)
      .then((result) => {res.json(result)})
      .catch((err) => {
        res.json({"message":err});
      });
  };

  exports.fetchItineraryID = function (req, res) {
    let email = req.params["email"];
    account
      .fetchItineraryIDs(email)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json({"message":err});
      });
  };