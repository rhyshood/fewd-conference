const nedb = require("gray-nedb");

class Account {
    constructor(accountFilePath) {
      console.log(accountFilePath);
      if (accountFilePath) {
        this.account = new nedb(accountFilePath);
        accountFilePath;
      } else {
        this.account = new nedb();
      }
    }
    init() {

    }

    checkPassword(email, pass){
        return new Promise((resolve, reject) => {
            this.account.find({emailAddress:email}, function (err, entry) {
              if (err) {
                reject(err);
              } else {
                let result = false;
                if(entry.password === pass){
                    result = true;
                }
                resolve(result);
                console.log("function checkPassword() returns: ", result);
              }
            });
          });
    }

    checkDuplicateEmail(email){
        return new Promise((resolve, reject) => {
            this.account.find({emailAddress:email}, function (err, entries) {
              if (err) {
                reject(err);
              } else {
                resolve(entries.length > 0);
              }
            });
          });
    }

    checkPassword(email, enteredPassword){
        return new Promise((resolve, reject) => {
            this.account.find({emailAddress:email}, function (err, entries) {
              if (err) {
                reject(err);
              } else {
                resolve(enteredPassword === entries.password);
              }
            });
          });
    }

    fetchSavedIDs(email){
        console.log("called")
        return new Promise((resolve, reject) => {
            this.account.find({emailAddress:email}, function (err, entries) {
              if (err) {
                reject(err);
              } else {
                resolve(entries);
              }
            });
          });
    }

    async createNewAccount(fName, lName, email, password) {
        const isDuplicate = await this.checkDuplicateEmail(email);
        return new Promise((resolve, reject) => {
            try {
                if (!isDuplicate) {
                    this.account.insert({
                        firstName: fName,
                        lastName: lName,
                        emailAddress: email,
                        password: password,
                        saved: [],
                        itinerary: [{
                          "9:00":"",
                        }]
                    });
                    resolve("Account Created Successfully")
                } else {
                    reject("Error: Email Already Registered")
                }
            } catch (error) {
                reject("Error checking duplicate email:", error)
            }
        });
    }

    addToSaved(email,talkId){
          return new Promise((resolve, reject) => {
            this.account.update({emailAddress:email},{$push:{'saved':talkId}}, function (err, entries) {
            if (err) {
              reject(err);
            } else {
               resolve(entries);
            }
          });
        });
      }

      fetchItineraryIDs(email){
        return new Promise((resolve, reject) => {
            this.account.find({emailAddress:email}, function (err, entries) {
              if (err) {
                reject(err);
              } else {
                resolve(entries);
              }
            });
          });
    }

    async addToItinerary(email,talkId,talkTime){
      let currentEntry = await this.fetchItineraryIDs(email)[talkTime];
          return new Promise((resolve, reject) => {
            if (currentEntry === ""){
              this.account.update({emailAddress:email},{$push:{'saved':talkId}}, function (err, entries) {
              if (err) {
                reject(err);
              } else {
                resolve(entries);
              }
            });
          } else {
            reject("Conflicting Time")
          }
        });
      }
}
module.exports = Account;