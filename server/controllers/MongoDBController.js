const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');

// JOHN STAR WARS MONGO URI
const DEMO_MONGO_URI = 'mongodb+srv://ja1423:codesmithunit10mongoose1423@cluster0.parwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const DEMO_MONGO_NAME = 'myFirstDatabase';

/* FUNC TO DECRYPT USER PG URI SENT FROM FRONT-END */
const userURIDecrypted = (encryptedUserURI) => {
  const data = CryptoJS.AES.decrypt(encryptedUserURI, secretKey);
  const decryptedURI = data.toString(CryptoJS.enc.Utf8);
  return decryptedURI;
};

const Controller = {};

/* CONNECT TO MONGO */
Controller.connectToMongo = async (req, res, next) => {
  let MONGO_URI;
  // if user URI in req.body.link, call userURIDecrypted to decrypt, otherwise use demo URI
  req.body.link ? (MONGO_URI = userURIDecrypted(req.body.link)) : (MONGO_URI = DEMO_MONGO_URI);

  let MONGO_NAME;
  // if user MONGO DB NAME in req.body.mongoName, use that, otherwise use demo MONGO DB NAME
  req.body.mongoName ? (MONGO_NAME = req.body.mongoName) : (MONGO_NAME = DEMO_MONGO_NAME);

  // CONNECT TO MONGO //
  /* MAY NEED TO USE MONGODB DRIVER FOR NODE INSTEAD OF MONGOOSE! 
  IN PROCESS OF LOOKING UP DOCS TO LIST ALL COLLECTIONS AND THEN
  ITERATE THROUGH COLLECTIONS AND FOR EACH COLLECTION
  LIST ALL DOCUMENTS IN THAT COLLECTOIN - Links below
  https://www.npmjs.com/package/mongodb
  http://mongodb.github.io/node-mongodb-native/3.6/installation-guide/installation-guide/
  http://mongodb.github.io/node-mongodb-native/3.6/reference/ecmascriptnext/crud/
   */

  const db = await mongoose
    .connect(MONGO_URI)
    // .db(MONGO_NAME)
    .then(() => console.log('Connected to Mongo DB.'))
    .catch((err) => console.log('Error: ', err));

  try {
    res.locals.MongoData = await db.find({}); /* PROBELM HERE WITH db.find({}), 
    not set up to run that func bc its not a mongoose schema... */
    return next();
  } catch (error) {
    const errObj = {
      log: `Error caught in server middleware @ connectToMongo: ${error}`,
      status: 400,
      message: {
        err: 'Unable to get MongoDB collections',
      },
    };
    return next(errObj);
  }
};

module.exports = Controller;
