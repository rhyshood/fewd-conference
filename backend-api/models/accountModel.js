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
                        interested: [],
                        itinerary: []
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
}
module.exports = Account;