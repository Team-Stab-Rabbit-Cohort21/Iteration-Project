const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController.js');

router.get(
  '/',
  favoritesController.getFavBusinesses,
  favoritesController.getFavNews,
  (req, res) => {
    const { businesses, news } = res.locals;
    res.status(200).send({ businesses, news });
  }
);

// BUSINESS/ACTIVITY

// add favorite business (activity)
router.post('/business', favoritesController.addFavBusiness, (req, res) => {
  // extract data from res.locals, send update list of all fav businesses? or can just push it into state on client side without waiting for response
  res.status(200).json({ message: 'business added to fav' });
});

// saved favorite business info outdated - should fetch current info from yelp to return to user
// params.id should be the business's yelp id (pk in the businesses table) so that we can update the business's entry in the business table AND also send it back to user
// should this be with favoritesControllers or businessesControllers?
router.get(
  '/business/:id',
  favoritesController.updateFavBusiness,
  (req, res) => {
    res.status(200).json(res.locals.businessInfo);
  }
);

// delete favorite business - remove entry in user_fav_business - might have to consider deletion cascade
// is there a way to send the user_id as well as business_id?  if not, we need to have the join table _id
router.delete(
  '/business/:join_id',
  favoritesController.deleteFavBusiness,
  (req, res) => {
    res.status(200).json({ message: 'business deleted from fav' });
  }
);

// NEWS

// add favorite news
router.post('/news', favoritesController.addFavNews, (req, res) => {
  // extract data from res.locals, send update list of all fav news?
  res.status(200).json({ message: 'news article added to fav' });
});

// saved favorite news outdated...?
// router.get('/news', favoritesController.updateFavNews, (req, res) => {
//   res.status(200).json({ message: 'would we ever need to update news?' });
// });

router.delete(
  '/news/:join_id',
  favoritesController.deleteFavNews,
  (req, res) => {
    res.status(200).json({ message: 'news article deleted from fav' });
  }
);

module.exports = router;
