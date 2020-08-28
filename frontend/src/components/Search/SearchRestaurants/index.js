import React from 'react';

import { TileGrid } from '../../../style/tile';
import TileRestaurant from '../../Shared/TileRestaurant';

const SearchRestaurants = (props) => {
  return (
    <>
      {props.restaurants.length > 0 ? (
        <TileGrid>
          {props.restaurants.map((restaurant) => (
            <TileRestaurant
              key={restaurant.id}
              restaurant={restaurant}
            ></TileRestaurant>
          ))}
        </TileGrid>
      ) : (
        'No restaurants to show.'
      )}
    </>
  );
};

export default SearchRestaurants;
