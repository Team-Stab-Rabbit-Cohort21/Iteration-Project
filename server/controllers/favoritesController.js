const db = require('../models/models');
const fetch = require('node-fetch');
const { ResolvePlugin } = require('webpack');

const favoritesController = {};

const YELP_API_KEY = process.env.Businesses_API_KEY;

favoritesController.getFavBusinesses = (req, res, next) => {
  // const { user_id } = req.query;
  // if using this middleware when loggin/signing in - should be somewhere in the res.locals.user
  const { _id } = res.locals.user;

  const queryStr = `
    SELECT b._id AS id, b.name, b.rating, b.review_count, b.location, b.image_url, b.url
    FROM businesses AS b
      INNER JOIN user_fav_businesses
        ON b._id = user_fav_businesses.business_id
    WHERE user_fav_businesses.user_id = $1`;

  db.query(queryStr, [_id])
    .then((data) => {
      if (!data.rows[0]) {
        return next({
          message: `database query from getFavBusiness returned undefined`,
        });
      }
      // organize data into to an object
      // {
      //   business_id (yelp id): {businessObj}
      // }
      // businessObj = {_id, name, url, ...}
      // data.rows is an array of businessObj
      res.locals.favBusinesses = data.rows.reduce((obj, businessObj) => {
        businessObj.location = JSON.parse(businessObj.location);
        obj[businessObj._id] = businessObj;
        return obj;
      }, {});
      console.log('favBusiness is an obj of objs', res.locals.favBusinesses);
      return next();
    })
    .catch((error) => {
      return next({
        message: `Error in favoritesController.getLocationData; ERROR: ${JSON.stringify(
          error
        )}`,
      });
    });
};

favoritesController.addFavBusiness = (req, res, next) => {
  const { user_id, business_id } = req.query;
  console.log(
    'from addFav, user_id and business_id with reqBody:',
    user_id,
    business_id,
    req.body
  );
  const { id, name, url, rating, review_count, location, image_url } = req.body;

  // insert business into Businesses table
  // what happens if value is undefined?
  let queryStr = `
    INSERT INTO Businesses (_id, name, url, rating, review_count, location, image_url)
    VALUES ( $1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (_id) DO NOTHING
    RETURNING _id`;

  let values = [
    id,
    name,
    url,
    rating,
    review_count,
    JSON.stringify(location),
    image_url,
  ];

  db.query(queryStr, values)
    .then((data) => {
      // if (!data.rows[0]) {
      //   return next({
      //     message: `database insertion from addFavBusiness1 returned undefined`,
      //   });
      // }
      // now add to user_fav_businesses
      queryStr = `
        INSERT INTO user_fav_businesses (user_id, business_id)
        VALUES ($1, $2)
        RETURNING _id`;

      values = [user_id, business_id];
      db.query(queryStr, values).then((data) => {
        if (!data.rows[0]) {
          return next({
            message: `database insertion from addFavBusiness2 returned undefined`,
          });
        }
        return next();
      });
    })
    .catch((error) => {
      console.log(error);
      return next({
        message: `Error in favoritesController.addFavBusiness; ERROR: ${JSON.stringify(
          error
        )}`,
      });
    });
};

favoritesController.updateFavBusiness = (req, res, next) => {
  const { user_id, business_id } = req.query;

  // make an api request to yelp
  const url = `https://api.yelp.com/v3/businesses/${business_id}`;

  fetch(url, {
    headers: {
      Authorization: `Bearer ${YELP_API_KEY}`,
    },
  })
    .then((data) => data.json())
    .then((data) => {
      // data is a BusinessObj
      const {
        id,
        name,
        image_url,
        url,
        review_count,
        rating,
        categories,
        location,
      } = data;
      res.locals.businessInfo = {
        id,
        name,
        image_url,
        url,
        review_count,
        rating,
        location,
      }.catch((err) => next(err));
      // update the businesses table

      let queryStr = `
      INSERT INTO Businesses (_id, name, image_url, url, review_count, rating, location)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      db.query(queryStr, [
        id,
        name,
        image_url,
        url,
        review_count,
        rating,
        JSON.stringify(location),
      ])
        .then((data) => {
          // update the user_fav_businesses table
          let queryStr = `
            INSERT INTO user_fav_businesses (user_id, business_id)
            VALUES ($1, $2)
            RETURNING _id`;
          db.query(queryStr, [user_id, business_id])
            .then((data) => {
              console.log('user_fav_businesses id', data.row[0]);
              return next();
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    });
  return next();
};

favoritesController.deleteFavBusiness = (req, res, next) => {
  const { user_id, business_id } = req.query;

  const queryStr = `
    DELETE FROM user_fav_businesses
    WHERE user_id = $1 AND business_id = $2
    RETURNING _id;`;

  const values = [user_id, business_id];
  db.query(queryStr, values)
    .then((data) => {
      console.log(data.rows.length + 'entries deleted');
      res.locals.message = 'deletion success';
      return next();
    })
    .catch((error) => {
      return next({
        message: `Error in favoritesController.deleteFavBusiness; ERROR: ${JSON.stringify(
          error
        )}`,
      });
    });
};

favoritesController.getFavNews = (req, res, next) => {
  const { _id } = res.locals.user;

  const queryStr = `
    SELECT News._id AS id, News.url, News.urlToImage, News.title, News.source_name
    FROM News
      INNER JOIN user_fav_news
        ON news._id = user_fav_news.news_id
    WHERE user_fav_news.user_id = $1`;

  db.query(queryStr, [_id])
    .then((data) => {
      if (!data.rows[0]) {
        return next({
          message: `database query from getFavBusiness returned undefined`,
        });
      }

      res.locals.favNews = data.rows.reduce((obj, newsObj) => {
        obj[newsObj._id] = newsObj;
        return obj;
      }, {});
      console.log('favNews is an obj of objs', res.locals.favNews);
      return next();
    })
    .catch((error) => {
      return next({
        message: `Error in favoritesController.getFavNews; ERROR: ${JSON.stringify(
          error
        )}`,
      });
    });
};

favoritesController.addFavNews = (req, res, next) => {
  return next();
};

favoritesController.deleteFavNews = (req, res, next) => {
  const { user_id, news_id } = req.query;

  const queryStr = `
    DELETE FROM user_fav_businesses
    WHERE user_id = $1 AND business_id = $2
    RETURNING _id;`;

  const values = [user_id, news_id];
  db.query(queryStr, values)
    .then((data) => {
      console.log(data.rows.length + 'entries deleted');
      res.locals.message = 'deletion success';
      return next();
    })
    .catch((error) => {
      return next({
        message: `Error in favoritesController.deleteFavNews; ERROR: ${JSON.stringify(
          error
        )}`,
      });
    });
};

module.exports = favoritesController;
