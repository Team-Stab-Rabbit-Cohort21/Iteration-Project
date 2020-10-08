import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const mapStateToProps = ({
  informationReducer: { lat, long, countryCode, favorites, user_id },
}) => ({ lat, long, countryCode, favorites, user_id });

// addFavorite: (data) => dispatch(actions.addFavorite(data)),

const ActivitiesView = (props) => {
  const [activitiesData, setActivitiesData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const [currentActivities, setCurrentActivities] = useState([]); // DISCUSS

  const countryCode = 'US';
  const DEFAULT_IMG = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';


  const isFavorite = (id, type = 'businesses') => {
    if (Object.prototype.hasOwnProperty.call(props.favorites[type], id)) return true;
    return false;
  }

  const createActivities = (activitiesObject, category) => {
    return activitiesObject.map((activitiesInfo, i) => {
      // if in favorites, add a different css class
      let className = 'activity-card';
      // TODO: the state of favorites becomes undefined after searching
      if (isFavorite(activitiesInfo.id)) {
        className += ' favorite-card';
      }

      return (
        <Card key={`activities-card-${i}`}
          className={className}
          style={{ 'width': '400px' }}
          onClick={() => { handleFavToggle(activitiesInfo) }}>
          <div className="card-img-container">
            <Card.Img className="card-img" variant="top" src={activitiesInfo.image_url} />
          </div>
          <Card.Body>
            <Card.Title>{activitiesInfo.name}</Card.Title>
            <Card.Text>
              Rating: {activitiesInfo.rating}
            </Card.Text>
            <Card.Text>
              Reviews Count: {activitiesInfo.review_count}
            </Card.Text>
            <Card.Text>
              Location: {activitiesInfo.location.address1}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

  const handleFavToggle = (data) => {
    const { name, id, image_url, url, rating, review_count, location } = data;
    const favObject = { user_id: props.user_id, name, id, image_url, url, rating, review_count, location, type: 'businesses' };
    const favoriteUrl = `/favorites/business`;

    // check to see if current card is in the favorites already
    if (Object.prototype.hasOwnProperty.call(props.favorites.businesses, id)) {
      // if so, remove it and send delete request
      props.deleteFromFavoriteOnClick(favObject);

      // DELETE using fetch
      fetch(`${favoriteUrl}?user_id=${favObject.user_id}?business_id=${favObject.id}`, {
        method: 'DELETE',
      })
        .then((data) => {
          console.log(data);
        })
        .catch(err => console.log(`DELETE favorites/business fetch ERROR: ${err}`));

      console.log(`*** DELETED --> user_id: ${favObject.user_id}, id: ${favObject.id} from favorites`);
    } else {
      // if not, add it and send post request
      props.addToFavoriteOnClick(favObject);

      // POST using fetch      
      fetch(favoriteUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(favObject),
      })
        .then((data) => {
          console.log(data);
        })
        .catch(err => console.log(`POST favorites/business fetch ERROR: ${err}`));

      console.log(`*** POSTED --> ${JSON.stringify(favObject)}`);
    }
    // console.log(`Businesses: ${JSON.stringify(props.favorites.businesses)} and id: ${id} `);
  }

  const fetchData = (category = 'bars') => {
    const url = `/businesses/${category}?lat=${props.lat}&lon=${props.long}`;
    // console.log(`ActivitiesView fetchData url: ${url}`);
    fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "Application/JSON",
      },
    })
      .then((res) => (res.json()))
      .then((data) => {
        setActivitiesData(data); // TODO ??? discuss what this does
        setFetchedData(true); // TODO ??? discuss what this does        
        setCurrentActivities(createActivities(data)); // TODO ??? discuss what this does
      })
      .catch((err) => console.log('Activities fetch ERROR: ', err));
  };

  const changeCategory = (category) => {
    return () => {
      fetchData(category);
      setCurrentActivities(createActivities(activitiesData, category)); // DISCUSS
    };
  };

  useEffect(() => {
    if (!fetchedData) fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [props.city])

  if (!activitiesData) return null;

  if (fetchedData) {
    const CATEGORIES = ['restaurants', 'bars', 'climbing', 'health', 'bowling', 'fitness'];
    const buttonsArray = [];

    for (let i = 0; i < CATEGORIES.length; i += 1) {
      buttonsArray.push(
        <Button
          key={`b${i}`}
          className="mx-1 my-3"
          variant="dark"
          onClick={changeCategory(CATEGORIES[i])}
          id={CATEGORIES[i]}
        >
          {CATEGORIES[i]}
        </Button>,
      );
    }


    return (
      <div className="activities-container">
        <h1 id="title">Local Activities Information</h1>
        <div className="activities-buttons">
          {buttonsArray}
          <Link to={'/favorites'}>
            <Button
              className="mx-1 my-3"
              variant="info"
            >
              Favorites
            </Button>
          </Link>
        </div>
        <div className="cards-container">
          <CardDeck>
            {currentActivities}
          </CardDeck>
        </div>
      </div>
    );
  } else {
    return (
      <h1 id="title">Fetching from database</h1>
    );
  }
};

export default connect(mapStateToProps, null)(ActivitiesView);
