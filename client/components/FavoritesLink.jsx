import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


const FavoritesLink = props => {
  return (
    <Link to={'/favorites'}>
      <Button
        className="mx-1 my-3"
        variant="info"
      >
        Favorites
            </Button>
    </Link>
  );
}

export default FavoritesLink;
