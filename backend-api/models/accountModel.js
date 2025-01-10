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
                console.log(entry)
                if(entry[0].password === pass){
                    resolve(true);
                }
                resolve(false);
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

    fetchSavedIDs(email){
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
                        itinerary: {
                          "9:00":"",
                          "10:30":"",
                          "12:00":"",
                          "14:00":"",
                          "15:30":""
                        }
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
            this.account.update({emailAddress:email},{$addToSet:{'saved':talkId}}, function (err, entries) {
            if (err) {
              reject(err);
            } else {
               resolve(entries);
            }
          });
        });
      }

      removeFromSaved(email,talkId){
        return new Promise((resolve, reject) => {
          this.account.update({emailAddress:email},{$pull:{'saved':talkId}}, function (err, entries) {
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
                resolve(entries[0].saved);
              }
            });
          });
    }

    async addToItinerary(email,talkId,talkTime){
            console.log(email)
            console.log(talkTime);
          return new Promise((resolve, reject) => {
              this.account.update({emailAddress:email},{$set:{[`itinerary.${talkTime}`]:talkId}}, function (err, entries) {
              if (err) {
                reject(err);
              } else {
                resolve(entries);
              }
            });
        });
      }

      async removeFromItinerary(email,talkTime){
        
        console.log(talkTime);
      return new Promise((resolve, reject) => {
          this.account.update({emailAddress:email},{$set:{[`itinerary.${talkTime}`]:""}}, function (err, entries) {
          if (err) {
            reject(err);
          } else {
            resolve(entries);
          }
        });
    });
  }

        async fetchItineraryIDs(email){
            return new Promise((resolve, reject) => {
                this.account.update({emailAddress:email}, function (err, entries) {
                if (err) {
                  reject(err);
                } else {
                  resolve(entries[0].itinerary);
                }
              });
          });
        }
}


module.exports = Account;