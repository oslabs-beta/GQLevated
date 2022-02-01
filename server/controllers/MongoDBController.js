const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');

// JOHN STAR WARS MONGO URI
const DEMO_MONGO_URI = 'mongodb+srv://ja1423:codesmithunit10mongoose1423@cluster0.parwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

/* FUNC TO DECRYPT USER PG URI SENT FROM FRONT-END */
const userURIDecrypted = (encryptedUserURI) => {
  const data = CryptoJS.AES.decrypt(encryptedUserURI, secretKey);
  const decryptedURI = data.toString(CryptoJS.enc.Utf8);
  return decryptedURI;
};

const Controller = {};

/* CONNECT TO MONGO */
Controller.connectToMongo = (req, res, next) => {
  let MONGO_URI;

  // if user URI in req.body.link, call userURIDecrypted to decrypt, otherwise use demo URI
  req.body.link ? (MONGO_URI = userURIDecrypted(req.body.link)) : (MONGO_URI = DEMO_MONGO_URI);

  const db = mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to Mongo DB.'))
    .then(() => {
      res.locals.Mongo = 'Connected to Mongo DB.';
      return next();
    })
    .catch((err) => console.log('Error: ', err));
};

module.exports = Controller;
