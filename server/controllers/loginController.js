const db = require('../models/models.js');

const loginController = {};

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
loginController.CreateUser = (req, res, next) => {
  const queryString = `INSERT INTO Users (first_name, last_name, email, password, location)
  VALUES (${req.body.formFirstName}, ${req.body.formLastName}, ${req.body.formEmail}, ${req.body.formPassword}, ${req.body.formDefaultLocation})
  RETURNING *`;
  // VALUES ('TEST3formFirstName', 'TEST3formLastName', 'TEST3formEmail', 'TEST3formPassword', 'TEST3formDefaultLocation')
  db.query(queryString, function (err, data) {
    if (err) {
      return next(`CreateUser Error, ${err}`);
    } else {
      res.locals.user = data.rows[0]; // this will be the userObj
      // console.log(data);
      return next();
    }
  });
};

module.exports = loginController;
