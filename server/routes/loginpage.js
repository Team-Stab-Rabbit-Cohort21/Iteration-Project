// require express package
const express = require('express');
// creater router
const router = express.Router();
// require our controller
const loginController = require('../controllers/loginController');

router.get('/', (req, res) => {
  console.log('THIS IS A TEST');
  res.send('this is what you should see');
});

// router.post('/', loginController.createUser, (req, res) => {
//   res.send('THIS IS THE RESPONSE');
// });

router.post('/', loginController.verifyCredentials, (req, res) => {
  // res.send('THIS IS THE RESPONSE');
  res.json({ message: 'this is the resposne from post to /login' });
});

module.exports = router;
