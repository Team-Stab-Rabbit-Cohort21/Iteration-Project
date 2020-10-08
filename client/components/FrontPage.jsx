import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Link } from 'react-router-dom';
import WeatherView from './WeatherView.jsx';
import NewsView from './NewsView.jsx';
import ActivitiesView from './ActivitiesView.jsx';

const mapDispatchToProps = dispatch => ({
  addCity(data) {
    dispatch(actions.addCity(data))
  },
  addToFavoriteOnClick: (data) => dispatch(actions.addFavorite(data)),
  deleteFromFavoriteOnClick: (data) => dispatch(actions.deleteFavorite(data)),
});

const mapStateToProps = ({ informationReducer: { lat, long, countryCode, city, favorites } }) => ({ lat, long, countryCode, city, favorites });

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [city, setCity] = useState('');

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchValue) return alert('Please type in a city');
    setCity(sendLocation(searchValue));
    event.preventDefault();
  }


  const sendLocation = (location) => {
    fetch(`/location/${location}`, {
      method: 'GET',
      headers: {
        "Content-Type": "Application/JSON"
      }
    })
      .then(res => res.json())
      .then(data => {
        setCity(searchValue);
        props.addCity({
          ...data,
          city: searchValue
        })
      })
      .then(data => {
        setCity(searchValue);
        props.addCity({
          ...data,
          city: searchValue
        })
      })
      .catch(err => console.log('Location fetch ERROR: ', err));
    return location;
  }

  return (
    <div>
      <div className='hero-container'>
        <div className='top-container'>
          <Link to={'/login'} className='loginButton'>
            <button id='loginButton'>Login</button>
            {/* <Login /> */}
          </Link>
          <WeatherView city={props.city} />
        </div>
        <div className='search-wrapper'>
          <h1><center>Find the best your city has to offer</center></h1>
          <form onSubmit={handleSubmit} className='login-form'>
            <input className='search-input'
              type="text"
              value={searchValue}
              onChange={handleChange}
            />
            <input className='search-btn' type="submit" value="Search" />
          </form>
        </div>
      </div>
      <div className='main-content'>
        <ActivitiesView city={props.city}
          favorites={props.favorites}
          deleteFromFavoriteOnClick={props.deleteFromFavoriteOnClick}
          addToFavoriteOnClick={props.addToFavoriteOnClick}
        />
        <NewsView city={props.city} favorites={props.favorites} />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
