const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const Controller = {};

/* CONNECT TO MONGO AND GET COLLECTION NAMES MIDDLEWARE */
Controller.connectToMongo = async (req, res, next) => {
  const MONGO_URI = res.locals.userURIDecrypted;

  try {
    const collectionNames = [];

    /* CONNECT TO MONGO DB, TRY FOR 5 SECONDS */
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 }).then(() => {
      /* GET MONGODB COLLECTION NAMES */
      mongoose.connection.db.listCollections().toArray(function (err, names) {
        if (err) {
          const errObj = {
            log: `Error caught in server middleware @ connectToMongo: ${err}`,
            status: 400,
            message: {
              err: 'Unable to get collection names from Mongo DB',
            },
          };
          return next(errObj);
        } else {
          /* GET MONGODB NAMES */
          res.locals.DBname = mongoose.connection.db.namespace;
          names.forEach((el) => collectionNames.push(el.name));
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
        err: 'Unable to connect to MongoDB Database Please enter a valid Connection String / Make sure your IP Adress has access',
      },
    };
    return next(errObj);
  }
};

/* GET MONGO DOCUMENTS FOR EACH COLLECTION NAME MIDDLEWARE */
Controller.getMongoDocuments = async (req, res, next) => {
  const MONGO_URI = res.locals.userURIDecrypted;

  // Mongo Databse Name
  const MONGO_NAME = res.locals.DBname;
  // Array of collections names
  const collectionNames = res.locals.collectionNames;

  try {
    const client = new MongoClient(MONGO_URI);

    await client.connect();
    // console.log('Connected to MongoDB...');
    const db = client.db(MONGO_NAME);

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

/* CONVERT MONGODB INFO TO GQLServerController READABLE OBJECT MIDDLEWARE */
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
