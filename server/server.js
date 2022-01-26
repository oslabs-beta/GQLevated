const express = require('express');
const router = require('./router');
const cors = require('cors');

const app = express();
const PORT = 8080;

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/* LISTEN */
app.listen(PORT, () => {
  console.log(`Ya Server Has Turned Da Fuck On! PORT: ${PORT}...`);
});

module.exports = app;
