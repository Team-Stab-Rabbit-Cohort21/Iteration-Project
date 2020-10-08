const fetch = require('node-fetch');

const newsController = {};

const API_KEY = process.env.NEWS_API_KEY;
const CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

// get information from google maps api
newsController.getNews = async (req, res, next) => {
  // `/news/${props.countryCode}?category=${category}`;
  const { countrycode } = req.params;
  const { category } = req.query;
  const promises = [];
  res.locals.news = {};
  // store fetch request promise for each CATEGORIES element
  CATEGORIES.forEach((categoryName) => {
    const url = `https://newsapi.org/v2/top-headlines?country=${countrycode}&category=${categoryName}&pageSize=5&page=1&apiKey=${API_KEY}`;
    promises.push(fetch(url).then((data) => data.json()));
  });

  // wait for all promises in promises array have resolved
  await Promise.all(promises)
    .then((results) => {
      results.forEach((newResultObj, index) => {
        res.locals.news[CATEGORIES[index]] = newResultObj.articles;
      });
    })
    .catch((error) =>
      next({
        message: `Error in newsController.getNews; ERROR: ${JSON.stringify(
          error
        )}`,
      })
    );
  return next();
};

module.exports = newsController;
