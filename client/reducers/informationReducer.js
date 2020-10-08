import * as types from "../constants/actionTypes";
const initialState = {
  city: 'NYC',
  lat: '40.712775',
  long: '-74.005973',
  countryCode: 'US',
  currentUser: '',
  weatherDays: [],
  favorites: {
    businesses: {},
    events: {},
    news: {},
  },
  user_id: 6,
};

const informationReducer = (state = initialState, action) => {
  let favorites;

  switch (action.type) {
    case types.ADD_CITY:
      return {
        ...state,
        city: action.payload.city,
        lat: action.payload.latitude,
        long: action.payload.longitude,
        countryCode: action.payload.countryCode,
      };
    case types.ADD_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case types.ADD_WEATHER:
      console.log('action payload ', action.payload);
      return {
        ...state,
        weatherDays: action.payload,
      };
    case types.ADD_FAVORITE:
      // copy favorites from state
      favorites = { ...state.favorites };
      // add new favorite from payload into favorites in state
      favorites[action.payload.type][action.payload.id] = action.payload;
      return {
        ...state,
        favorites,
      };
    case types.DELETE_FAVORITE:
      // copy favorites from state
      favorites = { ...state.favorites };
      // add new favorite from payload into favorites in state
      delete favorites[action.payload.type][action.payload.id];
      return {
        ...state,
        favorites,
      };

    default:
      return state;
  }
};

export default informationReducer;
