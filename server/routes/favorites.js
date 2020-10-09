const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController.js');

/*
router.get(
  '/',
  favoritesController.getFavBusinesses,
  favoritesController.getFavNews,
  (req, res) => {
    const { favBusinesses, favNews } = res.locals;
    // for the frontend:
    //{ favBusinesses: {_id: businessObj, _id: businessObj, ...},
    //  favNews: {_id: newsObj, _id: newsObj, ...}
    const favorites = { businesses: favBusinesses, news: favNews };
    res.status(200).send(favBusinesses);
  }
);
*/

// BUSINESS/ACTIVITY

router.post('/business', favoritesController.addFavBusiness, (req, res) => {
  res.status(200).send(res.locals.message);
});

// saved favorite business info outdated - should fetch current info from yelp to return to user
// need user_id and business_id from query
// should this be with favoritesControllers or businessesControllers?
router.get(
  '/business',
  favoritesController.updateFavBusiness,
  favoritesController.addFavBusiness,
  favoritesController.updateFavBusiness2,
  (req, res) => {
    res.status(200).json(res.locals.businessInfo);
  }
);

// delete favorite business - remove entry in user_fav_business - might have to consider deletion cascade
// need user_id and business_id from query
router.delete(
  '/business',
  favoritesController.deleteFavBusiness,
  (req, res) => {
    res.status(200).send(res.locals.message);
  }
);

// NEWS

router.post('/news', favoritesController.addFavNews, (req, res) => {
  res.status(200).send(res.locals.message);
});

/* saved favorite news outdated...?
router.get('/news', favoritesController.updateFavNews, (req, res) => {
  res.status(200).json({ message: 'would we ever need to update news?' });
 });
*/

router.delete('/news/', favoritesController.deleteFavNews, (req, res) => {
  res.status(200).send(res.locals.message);
});

module.exports = router;
