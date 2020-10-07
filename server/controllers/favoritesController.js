const db = require('../models/models');
const fetch = require('node-fetch');

const favoritesController = {};

const Businesses_API_KEY = process.env.Businesses_API_KEY;

favoritesController.getFavBusinesses = (req, res, next) => {
  const queryStr = `
    SELECT businesses.*, user_fav_businesses AS entry_id
    FROM businesses
      INNER JOIN user_fav_businesses
        ON businesses._id = user_fav_businesses.business_id
    WHERE user_fav_businesses.user_id = $1`;

  // db.query(queryStr).then((data) => {
  //   // if (!data.rows[0]) {
  //   //   return next({});
  //   // }
  // });
  return next();
};

favoritesController.addFavBusiness = (req, res, next) => {
  return next();
};

favoritesController.updateFavBusiness = (req, res, next) => {
  return next();
};

favoritesController.deleteFavBusiness = (req, res, next) => {
  return next();
};

favoritesController.getFavNews = (req, res, next) => {
  return next();
};

favoritesController.addFavNews = (req, res, next) => {
  return next();
};

favoritesController.deleteFavNews = (req, res, next) => {
  return next();
};

module.exports = favoritesController;
