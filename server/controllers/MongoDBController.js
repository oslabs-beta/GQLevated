const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const { MongoClient } = require('mongodb');
const secretKey = require('../secretKey');

/* FUNC TO DECRYPT USER PG URI SENT FROM FRONT-END */
const userURIDecrypted = (encryptedUserURI) => {
  const data = CryptoJS.AES.decrypt(encryptedUserURI, secretKey);
  const decryptedURI = data.toString(CryptoJS.enc.Utf8);
  return decryptedURI;
};

const Controller = {};

/* CONNECT TO MONGO AND GET COLLECTION NAMES */
Controller.connectToMongo = async (req, res, next) => {
  let MONGO_URI;
  // req.body.link ? (MONGO_URI = userURIDecrypted(req.body.link)) : (MONGO_URI = DEMO_MONGO_URI);
  MONGO_URI = userURIDecrypted(req.body.link);

  try {
    const db = mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB...');

    const collectionNames = [];

    /* GET COLLECTIONS NAMES FROM MONGODB - THIS WORKS */
    await mongoose.connection.on('open', function () {
      mongoose.connection.db.listCollections().toArray(function (err, names) {
        if (err) {
          console.log(err);
        } else {
          /* GET MONGODB NAME */
          // console.log(mongoose.connection.db.namespace);
          res.locals.DBname = mongoose.connection.db.namespace;
          // console.log(names);
          // names.forEach((el) => console.log(el.name));
          names.forEach((el) => collectionNames.push(el.name));
          // console.log('CollectionNames are', collectionNames);
          res.locals.collectionNames = collectionNames;
          mongoose.connection.close();
          return next();
        }
      });
    });
  } catch (error) {
    const errObj = {
      log: `Error caught in server middleware @ connectToMongo: ${error}`,
      status: 400,
      message: {
        err: 'Unable to connect to MongoDB Database Please enter a valid Connection String',
      },
    };
    return next(errObj);
  }
};

/* GET MONGO DOCUMENTS FOR EACH COLLECTION NAME */
Controller.getMongoDocuments = async (req, res, next) => {
  let MONGO_URI;
  // req.body.link ? (MONGO_URI = userURIDecrypted(req.body.link)) : (MONGO_URI = DEMO_MONGO_URI);
  MONGO_URI = req.body.link;

  // Mongo Databse Name
  const MONGO_NAME = res.locals.DBname;
  // Array of collections names
  const collectionNames = res.locals.collectionNames;

  console.log(MONGO_NAME);
  console.log(collectionNames);

  try {
    const client = new MongoClient(MONGO_URI);

    await client.connect();
    console.log('Connected to MongoDB...');
    const db = client.db(MONGO_NAME);

    // TEST TO GRAB DOCUMENTS FROM PEOPLE //
    // const collection = db.collection('people');
    // const findDocuments = await collection.find({}).toArray();
    // console.log('FOUND DOCUMENTS =>', findDocuments);
    // GOT TO HERE

    /* CREATE MONGO SCHEMA FROM DB */
    const MongoSchema = { tables: {} };

    let collection;
    let documents;

    /* LOOP THROUGH COLLECTION NAMES AND FIND ALL DOCUMENTS + POPULATE MONGO SCHEMA */
    for (let i = 0; i < collectionNames.length; i++) {
      MongoSchema.tables[collectionNames[i]] = { columns: {} };
      collection = db.collection(collectionNames[i]);
      documents = await collection.find({}).toArray();

      for (let j = 0; j < documents.length; j++) {
        MongoSchema.tables[collectionNames[i]].primaryKey = documents[j]._id;

        for (const key in documents[i]) {
          MongoSchema.tables[collectionNames[i]].columns[key] = { dataType: typeof documents[i][key] };
        }
      }
    }

    // console.log(MongoSchema);
    // console.log(MongoSchema.tables.people.columns);
    res.locals.MongoSchema = MongoSchema;

    return next();
  } catch (error) {
    const errObj = {
      log: `Error caught in server middleware @ getMongoDocuments: ${error}`,
      status: 400,
      message: {
        err: 'Unable to get MongoDB documents',
      },
    };
    return next(errObj);
  }
};

/* CONVERT MONGODB INFO TO GQLServerController READABLE OBJECT */
Controller.MongoPrepForGQL = (req, res, next) => {
  try {
    res.locals.preppedForGQL = {
      0: {
        name: res.locals.DBname,
        databaseName: 'MongoDB',
        tables: {},
      },
    };

    /* LOOP THROUGH TABLES AND POPULATE res.locals.preppedForGQL
  WITH APPROPRIATE DATA */
    const { tables } = res.locals.MongoSchema;
    let tableCount = 0;
    let fieldCount = 0;

    for (const table in tables) {
      let tableCache = (res.locals.preppedForGQL[0].tables[tableCount] = { type: table, fields: {} });

      // console.log(tables[table].columns);
      const tableFields = tables[table].columns;

      /* LOOP THROUGH FIELDS OF TABLE AND POPULATE res.locals.preppedForGQL WITH APPROPRIATE DATA */
      for (const field in tableFields) {
        tableCache.fields[fieldCount] = {
          name: field,
          type: tableFields[field].dataType === 'integer' ? 'Number' : tableFields[field].dataType,
          primaryKey: tables[table].primaryKey === field,

          // DEFAULTED TO TEMPREF.js
          required: false,
          multipleValues: false,
          relation: {
            tableIndex: -1,
            fieldIndex: -1,
            refType: '',
          },
          refBy: {},
        };
        fieldCount++;
      }

      fieldCount = 0;
      tableCount++;
    }
    // console.log('this is it', res.locals.preppedForGQL[0].tables[2].fields);
    return next();
  } catch (error) {
    const errObj = {
      log: `Error caught in server middleware @ MongoPrepForGQL: ${error}`,
      status: 400,
      message: {
        err: 'Unable to prep MongoSchema for GQL conversion',
      },
    };
    return next(errObj);
  }
};
module.exports = Controller;
