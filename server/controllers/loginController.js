const db = require('../models/models.js');
const bcrypt = require('bcrypt');

const loginController = {};
const SALT_WORK_FACTOR = 10;

// verify valid input controller
// loginController.validInput = (req, res, next) => {
//   const validFirstName =
//     typeof req.body.formFirstName === 'string' &&
//     req.body.formFirstName.trim() !== '';

//   const validLastName =
//     typeof req.body.formLastName === 'string' &&
//     req.body.formLastName.trim() !== '';

//   const validEmail =
//     typeof req.body.formEmail === 'string' && req.body.formEmail.trim() !== '';

//   const validPassword =
//     typeof req.body.formPassword === 'string' &&
//     req.body.formPassword.trim() !== '';

//   if (err) {
//     return next(`validInput Error, ${err}`);
//   } else {
//     if (
//       validFirstName &&
//       validLastName &&
//       validEmail &&
//       validPassword
//       // && validDefaultLocation
//     ) {
//       return next();
//     }
//   }
// };

// check if the account had been established by checking if the email is already in the database
loginController.verifyCredentials = (req, res, next) => {
  console.log('post req to login body is', req.body);
  const { email, password } = req.body;
  const queryStr = `
    SELECT * FROM Users
    WHERE email = $1`;

  db.query(queryStr, [email]).then((data) => {
    if (!data.rows[0]) {
      return next({
        message: `Error: Email ${email} not found, please sign up`,
      });
    }
    const foundUser = data.rows[0];
    console.log('foundUser', foundUser);
    bcrypt.compare(password, foundUser.password, (err, result) => {
      if (result === true) {
        res.locals.user = foundUser;
        // console.log('hello, pw matched!');
        return next();
      } else {
        return next({ message: `Error: password does not match` });
      }
    });
  });
};

// create user controller
loginController.createUser = (req, res, next) => {
  const { first_name, last_name, email, password, location } = req.body;

  bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next('HASH FUNCTION ERROR', err);

    const queryString = `INSERT INTO Users (first_name, last_name, email, password, location)
      VALUES ($1, $2, $3, '${hash}', $4)
      RETURNING *`;
    const values = [first_name, last_name, email, location];
    db.query(queryString, values)
      .then((data) => {
        if (!data.rows[0]) return next({ message: 'nothing from database' });
        res.locals.user = data.rows[0]; // the userObj
        return next();
      })
      .catch((err) => {
        console.log('error in createUser', err);
        return next({
          message: `error occured in creating new entry for user in loginController.createUser, ERROR: ${err}`,
        });
      });
  });
};

module.exports = loginController;
