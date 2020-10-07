// require express package
const express = require('express');
// creater router
const router = express.Router();
// require our controller
// const loginController = require('../controllers/loginController');

router.get('/', (req, res) => {
  res.send('this is what you should see');
});

router.post('/', loginController.validUser, (req, res) => {
  res.send('POST Request works on login');
});

module.exports = router;
