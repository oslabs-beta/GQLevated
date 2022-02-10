const express = require('express');
const router = require('./router');
const cors = require('cors');
const compression = require('compression');

const app = express();
const PORT = 8080;

/* CORS OPTIONS */
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

/* COMPRESSION FILTER */
const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression({ filter: shouldCompress }));

app.use('/', router);

/* UNKNOWN ROUTE */
app.use('*', (req, res) => res.status(404).send('This Page Does Not Exist'));

/* GLOBAL ERROR HANDLER */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler in unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

/* LISTEN */
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on PORT: ${PORT}...`);
});

module.exports = app;
