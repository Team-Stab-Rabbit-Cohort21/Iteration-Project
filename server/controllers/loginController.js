const db = require('db');

const loginController = {};

loginController.validUser = (req, res, next) => {
  try {
    const validFirstName =
      typeof req.body.formFirstName === 'string' &&
      req.body.formFirstName.trim() !== '';

    const validLastName =
      typeof req.body.formLastName === 'string' && req.body.formLastName !== '';

    const validEmail =
      typeof req.body.formEmail === 'string' &&
      req.body.formEmail.trim() !== '';

    const validPassword =
      typeof req.body.formPassword === 'string' &&
      req.body.formPassword.trim() !== '';

    const validDefaultLocation =
      typeof req.body.formDefaultLocation === 'string' &&
      req.body.formDefaultLocation.trim() !== '';

    if (
      validFirstName &&
      validLastName &&
      validEmail &&
      validPassword &&
      validDefaultLocation
    ) {
      return next(req.body);
    }
  } catch (error) {
    return next(`Invalid input, ${error}`);
  }
};

loginController.verifyCredentials = (req, res, next) => {
  const queryString = `SELECT email FROM Users`;
  
  db.query(queryString)
  .then((data) => {
    if (req.body.formEmail in data){
      return next()
    }
  })
  .catch(error) {
    return next(`Account existed, error`)
  }
};

loginController.CreateUser = (req, res, next) => {
  let fullName = req.body.formFirstName + req.body.formLastName
  const queryString = `INSERT INTO Users (username, email, password, location)
  VALUES (fullName, req.body.formEmail, req.body.formPassword, req.body.formDefaultLocation)`
  db.query(queryString)
}

module.exports = loginController;