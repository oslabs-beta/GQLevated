const { Pool } = require('pg');
const CryptoJS = require('crypto-js');

const fs = require('fs');
const SQLDBAllTablesQuery = fs.readFileSync('server/SQLDBAllTablesQuery.sql', 'utf8');
const secretKey = require('../secretKey');

/* DEMO DB URI */
const DEMO_PG_URI = 'postgres://zopukfce:9HtnUz7qn0mkyXDet_HCqe9-qXjbAZx1@ruby.db.elephantsql.com/zopukfce';

const Controller = {};

/* FUNC TO DECRYPT USER PG URI SENT FROM FRONT-END */
const userURIDecrypted = (encryptedUserURI) => {
  const data = CryptoJS.AES.decrypt(encryptedUserURI, secretKey);
  const decryptedURI = data.toString(CryptoJS.enc.Utf8);
  return decryptedURI;
};

/* GET DB NAME */
Controller.getSQLDBname = (req, res, next) => {
  let PSQL_URI;

  // if user URI in req.body.link, call userURIDecrypted to decrypt, otherwise use demo URI
  req.body.link ? (PSQL_URI = userURIDecrypted(req.body.link)) : (PSQL_URI = DEMO_PG_URI);

  const db = new Pool({ connectionString: PSQL_URI });
  db.query('SELECT current_database();')
    .then((data) => {
      res.locals.DBname = data.rows[0].current_database;
      return next();
    })
    .catch((err) => {
      const errObj = {
        log: `ERROR in server middleware @ getSQLDBname: ${err}`,
        status: 400,
        message: {
          err: 'Unable to connect to PostgreSQL Database Please enter a valid Connection String',
        },
      };
      return next(errObj);
    });
};

/* GET DB TABLES */
Controller.getSQLTables = (req, res, next) => {
  let PSQL_URI;

  // if user URI in req.body.link, call userURIDecrypted to decrypt, otherwise use demo URI
  req.body.link ? (PSQL_URI = userURIDecrypted(req.body.link)) : (PSQL_URI = DEMO_PG_URI);

  const db = new Pool({ connectionString: PSQL_URI });
  db.query(SQLDBAllTablesQuery)
    .then((data) => {
      // res.locals.SQLSchema = data.rows[0].tables;
      res.locals.SQLSchema = data.rows[0];
      return next();
    })
    .catch((err) => {
      const errObj = {
        log: `ERROR in server middleware @ getSQLTables: ${err}`,
        status: 400,
        message: {
          err: 'Unable to connect to SQL database, please confirm URI',
        },
      };
      return next(errObj);
    });
};

/* CONVERT DB INFO TO GQLServerController READABLE OBJECT */
Controller.prepForGQL = (req, res, next) => {
  // console.log('fuck yeah! lets go');
  try {
    res.locals.preppedForGQL = {
      0: {
        name: res.locals.DBname,
        databaseName: 'PostgreSQL',
        tables: {},
      },
    };

    /* LOOP THROUGH TABLES AND POPULATE res.locals.preppedForGQL
  WITH APPROPRIATE DATA */
    const { tables } = res.locals.SQLSchema;
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
      log: `Error caught in server middleware @ prepForGQL: ${error}`,
      status: 400,
      message: {
        err: 'Unable to prep for GQL conversion',
      },
    };
    return next(errObj);
  }
};

module.exports = Controller;
