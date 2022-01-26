const express = require('express');
const router = express.Router();
const { getSQLTables, getSQLDBname, prepForGQL } = require('./controllers/SQLController');
const { convertToGQLServerCode } = require('./controllers/GQLServerController');

router.get('/', (req, res) => {
  res.status(200).send('GET OUT OF MY BACKEND!');
});

/* ROUTE TO GET DEMO POSTGRESQL DB AND CONVERT TO GRAPHQL SERVER CODE */
router.get('/convert-demo-db', getSQLDBname, getSQLTables, prepForGQL, convertToGQLServerCode, (req, res) => {
  res.status(200).json(res.locals.GQLServerCode);
});

/* ROUTE TO GET USER POSTGRESQL DB AND CONVERT TO GRAPHQL SERVER CODE */
router.post('/convert-sql-db', getSQLDBname, getSQLTables, prepForGQL, convertToGQLServerCode, (req, res) => {
  // console.log('this is res.locals', res.locals);
  // console.log('this is res.locals.GQLServerCode', res.locals.GQLServerCode);
  res.status(200).json(res.locals.GQLServerCode);
});

module.exports = router;
