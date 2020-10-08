import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
// import CardGroup from 'react-bootstrap/CardGroup';
import * as actions from '../actions/actions.js'

// const mapDispatchToProps = dispatch => ({
//   addCity(data) { dispatch(actions.addCity(data)) }
// });

const mapStateToProps = ({
  informationReducer: { favorites }
}) => ({ favorites });

const Favorites = props => {
  console.log(props.favorites);
  const { businesses } = props.favorites;

  const favoriteBusinesses = Object.entries(businesses).map((business, index) => {
    let className = 'activity-card';
    return (
      <Card key={`activities-card-${i}`}
        className={className}
        style={{ 'width': '400px' }}>
        <div className="card-img-container">
          <Card.Img className="card-img" variant="top" src={business.image_url} />
        </div>
        <Card.Body>
          <Card.Title>{business.name}</Card.Title>
          <Card.Text>
            Rating: {business.rating}
          </Card.Text>
          <Card.Text>
            <Link href={business.url}>more details</Link>
          </Card.Text>
          <Card.Text>
            Location: {business.location.address1}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  });
  return (
    <div>
      <h1>Favorites</h1>
      <CardDeck className='detailed-weather-container'>
        {favoriteBusinesses}
      </CardDeck>
    </div>
  );
}
export default connect(mapStateToProps, null)(Favorites);

