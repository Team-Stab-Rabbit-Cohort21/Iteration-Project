// require express package
const express = require('express');
// creater router
const router = express.Router();
// require our controller
const loginController = require('../controllers/loginController');
const favoritesController = require('../controllers/favoritesController');

// router.get('/', (req, res) => {
//   console.log('THIS IS A TEST');
//   res.send('this is what you should see');
// });

// router.post('/', loginController.createUser, (req, res) => {
//   res.send('THIS IS THE RESPONSE');
// });

router.post('/signup', loginController.createUser, (req, res) => {
  const { user } = res.locals;
  const favorites = { business: {}, news: {}, events: {} };
  console.log('signup user', res.locals.user);
  res.json({ user, favorites });
});

router.post(
  '/login',
  loginController.verifyCredentials,
  favoritesController.getFavBusinesses,
  (req, res) => {
    const { user, favBusinesses } = res.locals;
    const favorites = { business: favBusinesses, news: {}, events: {} };
    res.json({ user, favorites });
  }
);

module.exports = router;
