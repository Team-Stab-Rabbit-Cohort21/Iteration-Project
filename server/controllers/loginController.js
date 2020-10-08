const db = require('../models/models.js');
const bcrypt = require('bcrypt');

const loginController = {};
const SALT_WORK_FACTOR = 10;

// verify valid input controller
loginController.validInput = (req, res, next) => {
  const validFirstName =
    typeof req.body.formFirstName === 'string' &&
    req.body.formFirstName.trim() !== '';

  const validLastName =
    typeof req.body.formLastName === 'string' &&
    req.body.formLastName.trim() !== '';

  const validEmail =
    typeof req.body.formEmail === 'string' && req.body.formEmail.trim() !== '';

  const validPassword =
    typeof req.body.formPassword === 'string' &&
    req.body.formPassword.trim() !== '';

  // const validDefaultLocation =
  //   typeof req.body.formDefaultLocation === 'string' &&
  //   req.body.formDefaultLocation.trim() !== '';
  if (err) {
    return next(`validInput Error, ${err}`);
  } else {
    if (
      validFirstName &&
      validLastName &&
      validEmail &&
      validPassword
      // && validDefaultLocation
    ) {
      next(req.body);
    }
  }
};

// check if the account had been established by checking if the email is already in the database
loginController.verifyCredentials = (req, res, next) => {
  // data.rows
  // maybe do SELECT * FROM Users WHERE email = $1
  // db.query(queryString, [req.body.formEmail])
  // grab data from data.rows and store it in res.locals.user so you can do the password
  const queryString = `SELECT email FROM Users`;
  db.query(queryString, function (err, data) {
    if (err) {
      return next(`verifyCredentials Error, ${err}`);
    } else {
      // console.log(data);
      let emailList = data.rows.map((ele) => {
        return ele.email;
      });
      // console.log(emailList);
      if (emailList.includes(req.body.formEmail)) {
        res.send('Account has been registered!');
      } else {
        return next();
      }
    }
  });
};

// create user controller
loginController.createUser = (req, res, next) => {
  // console.log('req.body', req.body);
  // console.log('formPassword', req.body.formPassword);
  bcrypt.hash(req.body.formPassword, SALT_WORK_FACTOR, (err, hash) => {
    // req.body.formPassword = hash;
    if (err) return next('HASH FUNCTION ERROR', err);
    // console.log('THIS IS THE HASHED PASSWORD: ', req.body.formPassword);
    // console.log(encryptedPass);
    // console.log('this is the hased pw', hash);
    // console.log('type of pash is', typeof hash);
    const queryString = `INSERT INTO Users (first_name, last_name, email, password, location)
      VALUES ('TEST4formFirstName', 'TEST4formLastName', 'TEST4formEmail', '${hash}', 'TEST4formDefaultLocation')
      RETURNING *`;
    // VALUES (${req.body.formFirstName}, ${req.body.formLastName}, ${req.body.formEmail}, ${encryptedPass}, ${req.body.formDefaultLocation})
    db.query(queryString, function (err, data) {
      if (err) {
        console.log('error from database', err);
        return next(`CreateUser Error, ${err}`);
      } else {
        res.locals.user = data.rows[0]; // this will be the userObj
        console.log(data.rows[0]);
        return next();
      }
    });
  });
};

// loginController.userLogin = (req, res, next) => {
//   const queryString = `SELECT password FROM Users WHERE email=${formEmail}`;
//   db.query(queryString, function (err, data) {
//     if (err) return next('userLogin Error', err);
//     else {
//       bcrypt.compare(req.body.formPassword, data, (err, result) => {
//         if (err) {
//           return 'bcrypt error', err;
//         } else if (result) {
//           res.redirect('/');
//         } else {
//           return 'Password not match.';
//         }
//       });
//     }
//   });
// };

// const plainTestPassword = req.query.pass;

module.exports = loginController;
