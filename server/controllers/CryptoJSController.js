const CryptoJS = require('crypto-js');
const secretKey = require('../secretKey');

/* DEMO POSTGRESQL DB URI */
const DEMO_PG_URI = 'postgres://zopukfce:9HtnUz7qn0mkyXDet_HCqe9-qXjbAZx1@ruby.db.elephantsql.com/zopukfce';

/* FUNC TO DECRYPT USER PG URI SENT FROM FRONT-END */
const userURIDecrypted = (encryptedUserURI) => {
  const data = CryptoJS.AES.decrypt(encryptedUserURI, secretKey);
  const decryptedURI = data.toString(CryptoJS.enc.Utf8);
  return decryptedURI;
};

const Controller = {};

/* DECRYPT INCOMING USER URI MIDDLEWARE */
Controller.decryptURI = (req, res, next) => {
  try {
    /* If encypted user URI is in req.body.link
    call userURIDecrypted to decrypt it and store in res.locals, otherwise use demo URI */
    req.body.link ? (res.locals.userURIDecrypted = userURIDecrypted(req.body.link)) : (res.locals.userURIDecrypted = DEMO_PG_URI);
    return next();
  } catch (error) {
    const errObj = {
      log: `Error caught in server middleware @ decryptURI: ${error}`,
      status: 400,
      message: {
        err: 'Unable to decrypt user Connection String',
      },
    };
    return next(errObj);
  }
};

module.exports = Controller;
