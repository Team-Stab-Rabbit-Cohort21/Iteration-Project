import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
// import CardGroup from 'react-bootstrap/CardGroup';
import * as actions from '../actions/actions.js'

// const mapDispatchToProps = dispatch => ({
//   addCity(data) { dispatch(actions.addCity(data)) }
// });

const mapStateToProps = ({
  informationReducer: { favorites }
}) => ({ favorites });

const createBusinessComponents = (businesses) => {
  return businesses.map((business, index) => {
    const [businessId, businessData] = business;
    let className = 'activity-card';
    console.log(`Favorite Business ${index}: ${JSON.stringify(business)}`);
    return (
      <Card key={`activities-card-${index}`}
        className={className}
        style={{ 'width': '400px' }}>
        <div className="card-img-container">
          <Card.Img className="card-img" variant="top" src={businessData.image_url} />
        </div>
        <Card.Body>
          <Card.Title>{businessData.name}</Card.Title>
          <Card.Text>
            Rating: {businessData.rating}
          </Card.Text>
          <Card.Text>
            <a href={businessData.url}>more details</a>
          </Card.Text>
          <Card.Text>
            Location: {businessData.location.display_address}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  });
}

const createNewsComponents = (news) => {
  const DEFAULT_IMG =
    'https://joebalestrino.com/wp-content/uploads/2019/02/Marketplace-Lending-News.jpg';

  return news.map((article, index) => {
    const [articleId, articleData] = article;
    let className = 'activity-card';
    console.log(`Favorite Article ${index}: ${JSON.stringify(article)}`);
    return (
      <Card key={`favorite-news-card-${i}`} className='activities-card' >
        <div className="card-img-container ">
          <a href={articleData.url}>
            <Card.Img
              className="card-img"
              variant="top"
              src={articleData.urlToImage || DEFAULT_IMG}
            />
          </a>
        </div>
        <Card.Body>
          <Card.Title>{articleData.title}</Card.Title>
          <Card.Text>{articleData.source.name}</Card.Text>
        </Card.Body>
      </Card>
    )
  });
}

const Favorites = props => {
  console.log(props.favorites);
  const { businesses, news, events } = props.favorites;

  // create favorite businesses components
  const favoriteBusinesses = createBusinessComponents(Object.entries(props.favorites.businesses));

  // create favorite news components
  const favoriteNews = createBusinessComponents(Object.entries(props.favorites.businesses));

  return (
    <div>
      <h1>Favorites</h1>

      <h2>Businesses</h2>
      <CardDeck className='detailed-weather-container'>
        {favoriteBusinesses}
      </CardDeck>

      <h2>News</h2>
      <CardDeck className='detailed-weather-container'>
        {favoriteBusinesses}
      </CardDeck>

      <h2>Events</h2>
      <CardDeck className='detailed-weather-container'>
        {favoriteBusinesses}
      </CardDeck>

      <Link to={'/'}>
        <Button className="mx-1 my-3" variant="secondary">
          Back
        </Button>
      </Link>
    </div>
  );
}
export default connect(mapStateToProps, null)(Favorites);

