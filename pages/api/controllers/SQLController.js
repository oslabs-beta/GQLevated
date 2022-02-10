const { Pool } = require('pg');
const fs = require('fs');
const SQLDBAllTablesQuery = fs.readFileSync('pages/api/SQLDBAllTablesQuery.sql', 'utf8');

const Controller = {};

/* CONNECT TO POSTGRESQL AND GET DB NAME MIDDLEWARE */
Controller.getSQLDBname = (req, res, next) => {
  const PSQL_URI = res.locals.userURIDecrypted;

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

/* CONNECT TO POSTGRESQL AND GET DB TABLES MIDDLEWARE */
Controller.getSQLTables = (req, res, next) => {
  const PSQL_URI = res.locals.userURIDecrypted;

  const db = new Pool({ connectionString: PSQL_URI });

  db.query(SQLDBAllTablesQuery)
    .then((data) => {
      res.locals.SQLSchema = data.rows[0];
      return next();
    })
    .catch((err) => {
      const errObj = {
        log: `ERROR in server middleware @ getSQLTables: ${err}`,
        status: 400,
        message: {
          err: 'Unable to connect to PostgreSQL Database Please enter a valid Connection String',
        },
      };
      return next(errObj);
    });
};

/* CONVERT POSTGRESQL DB INFO TO GQLServerController READABLE OBJECT MIDDLEWARE */
Controller.prepForGQL = (req, res, next) => {
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
      log: `Error caught in server middleware @ prepForGQL: ${error}`,
      status: 400,
      message: {
        err: 'Unable to prep SQLSchema for GQL conversion',
      },
    };
    return next(errObj);
  }
};

module.exports = Controller;
