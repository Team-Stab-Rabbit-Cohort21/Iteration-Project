CREATE TABLE Users (
  _id SERIAL PRIMARY KEY,
  -- username VARCHAR NOT NULL UNIQUE,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  location VARCHAR DEFAULT 'NYC'
)

-- activities, using yelp id as _id, client side need to send these data in the post request
CREATE TABLE Businesses (
  _id VARCHAR PRIMARY KEY, 
  name VARCHAR NOT NULL,
  rating DECIMAL,
  review_count VARCHAR,
  location VARCHAR,
  image_url VARCHAR,
  url VARCHAR,
  category VARCHAR
)

CREATE TABLE News (
  _id SERIAL PRIMARY KEY,
  url VARCHAR NOT NULL,
  urlToImage VARCHAR,
  title VARCHAR NOT NULL,
  source_name VARCHAR NOT NULL,
  category VARCHAR
)

CREATE TABLE user_fav_businesses (
  _id SERIAL PRIMARY KEY,
  user_id INT NOT NULL, 
  business_id VARCHAR NOT NULL,
  saved_date DATE DEFAULT CURRENT_DATE,
  FOREIGN KEY (user_id) REFERENCES users (_id),
  FOREIGN KEY (business_id) REFERENCES businesses (_id)
)

CREATE TABLE user_fav_news (
  _id SERIAL PRIMARY KEY,
  user_id INT NOT NULL, 
  news_id INT NOT NULL,
  saved_date DATE DEFAULT CURRENT_DATE,
  FOREIGN KEY (user_id) REFERENCES Users (_id),
  FOREIGN KEY (news_id) REFERENCES News (_id)
)

CREATE TABLE user_business_categories (
  _id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  business_category VARCHAR NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users (_id)
)


CREATE TABLE user_news_categories (
  _id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  news_category VARCHAR NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users (_id)
)


-- CREATE TABLE user_fav_events (
--   _id SERIAL PRIMARY KEY,
--   user_id INT NOT NULL, 
--   event_id INT NOT NULL,
  -- saved_date DATE NOT NULL,
--   FOREIGN KEY (user_id) REFERENCES Users (_id),
--   FOREIGN KEY (event_id) REFERENCES Events (_id)
-- )

