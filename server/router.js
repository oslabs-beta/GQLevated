const express = require('express');
const router = express.Router();
const { getSQLTables, getSQLDBname, prepForGQL } = require('./controllers/SQLController');
const { connectToMongo, getMongoDocuments, MongoPrepForGQL } = require('./controllers/MongoDBController');
const { convertToGQLServerCode } = require('./controllers/GQLServerController');
const { convertToGQLClientQueriesCode, convertToGQLClientMutationsCode } = require('./controllers/GQLClientController');

router.get('/', (req, res) => {
  res.status(200).send('HELLO FROM THE BACKEND!');
});

/* ROUTE TO GET DEMO POSTGRESQL DB AND CONVERT TO GRAPHQL SERVER, CLIENT QUERIES AND MUTATIONS CODE */
router.get(
  '/convert-demo-db',
  getSQLDBname,
  getSQLTables,
  prepForGQL,
  convertToGQLServerCode,
  convertToGQLClientQueriesCode,
  convertToGQLClientMutationsCode,
  (req, res) => {
    // console.log('this is res.locals', res.locals);
    // console.log('this is res.locals.GQLServerCode', res.locals.GQLServerCode);
    // console.log('this is res.locals.GQLClientQueriesCode', res.locals.GQLClientQueriesCode);
    // console.log('this is res.locals.GQLClientMutationsCode', res.locals.GQLClientMutationsCode);

    const GQLCode = {
      DBName: res.locals.DBname,
      SQLSchema: res.locals.SQLSchema,
      GQLServerCode: res.locals.GQLServerCode,
      GQLClientQueriesCode: res.locals.GQLClientQueriesCode,
      GQLClientMutationsCode: res.locals.GQLClientMutationsCode,
    };
    res.status(200).json(GQLCode);
  }
);

/* ROUTE TO GET USER POSTGRESQL DB AND CONVERT TO GRAPHQL SERVER, CLIENT QUERIES AND MUTATIONS CODE */
router.post(
  '/convert-sql-db',
  getSQLDBname,
  getSQLTables,
  prepForGQL,
  convertToGQLServerCode,
  convertToGQLClientQueriesCode,
  convertToGQLClientMutationsCode,
  (req, res) => {
    // console.log('this is res.locals', res.locals);
    // console.log('this is res.locals.GQLServerCode', res.locals.GQLServerCode);
    // console.log('this is res.locals.GQLClientQueriesCode', res.locals.GQLClientQueriesCode);
    // console.log('this is res.locals.GQLClientMutationsCode', res.locals.GQLClientMutationsCode);

    const GQLCode = {
      DBName: res.locals.DBname,
      SQLSchema: res.locals.SQLSchema,
      GQLServerCode: res.locals.GQLServerCode,
      GQLClientQueriesCode: res.locals.GQLClientQueriesCode,
      GQLClientMutationsCode: res.locals.GQLClientMutationsCode,
    };
    res.status(200).json(GQLCode);
  }
);

/* ROUTE TO GET USER MONGO DB AND CONVERT TO GRAPHQL SERVER, CLIENT QUERIES AND MUTATIONS CODE */
router.post(
  '/convert-mongo-db',
  connectToMongo,
  getMongoDocuments,
  MongoPrepForGQL,
  convertToGQLServerCode,
  convertToGQLClientQueriesCode,
  convertToGQLClientMutationsCode,
  (req, res) => {
    // console.log('this is res.locals', res.locals);
    // console.log('this is res.locals.GQLServerCode', res.locals.GQLServerCode);
    // console.log('this is res.locals.GQLClientQueriesCode', res.locals.GQLClientQueriesCode);
    // console.log('this is res.locals.GQLClientMutationsCode', res.locals.GQLClientMutationsCode);

    const GQLCode = {
      DBName: res.locals.DBname,
      MongoSchema: res.locals.MongoSchema,
      GQLServerCode: res.locals.GQLServerCode,
      GQLClientQueriesCode: res.locals.GQLClientQueriesCode,
      GQLClientMutationsCode: res.locals.GQLClientMutationsCode,
    };
    // res.status(200).json(GQLCode);
    res.status(200).json(GQLCode);
  }
);

module.exports = router;
