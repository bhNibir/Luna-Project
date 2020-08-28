import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Axios from '../../../axios';

import { H2 } from '../../../style/titles';
import { RatingStars } from '../../../style/stars';
import { BaseContentButton, SmallButtonGrey } from '../../../style/buttons';

//////////
// STYLE
//////////

const RestaurantTile = styled.div`
  width: 100%;
  background: white;
  padding: 20px;
  font-weight: bold;
  height: auto;
  margin-bottom: 20px;
`;

const RestaurantName = styled(Link)`
  margin-bottom: 10px;
  display: block;
  text-decoration: none;
  color: #e47d31;
`;

const ButtonWrapperDelete = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ButtonWrapper = styled(Link)`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
`;

//////////
// REACT
//////////
const ProfileRestaurants = (props) => {
  const me = useSelector((state) => state.user);

  const deleteRestaurant = (id) => {
    if (me.token) {
      const url = `restaurants/${id}/`;
      const auth = 'Bearer ' + me.token;
      const headers = { headers: { Authorization: auth } };

      Axios.delete(url, headers)
        .then((response) => {
          console.log('Restaurant deleted');
          props.fnReload();
        })
        .catch((error) => {
          console.log('Restaurant delete error', error.response.data);
        });
    } else {
      console.log('Delete only works if you are logged in');
    }
  };

  return (
    <div>
      <H2>Restaurants</H2>
      {props.restaurants.length > 0 ? (
        <>
          {props.restaurants.map((restaurant) => (
            <RestaurantTile key={restaurant.id}>
              <RestaurantName to={`/restaurant/${restaurant.id}`}>
                {restaurant.name}
              </RestaurantName>
              <RatingStars rating={restaurant.rating.rating__avg}></RatingStars>
              {restaurant.user.id === me.userData.id ? (
                <ButtonWrapperDelete>
                  <SmallButtonGrey
                    onClick={() => deleteRestaurant(restaurant.id)}
                  >
                    Delete
                  </SmallButtonGrey>
                </ButtonWrapperDelete>
              ) : (
                <></>
              )}
            </RestaurantTile>
          ))}
        </>
      ) : (
        'This user has no restaurants.'
      )}
      {props.showButton ? (
        <ButtonWrapper to="/createnewrestaurant">
          <BaseContentButton>Create Restaurant</BaseContentButton>
        </ButtonWrapper>
      ) : (
        ''
      )}
    </div>
  );
};

export default ProfileRestaurants;
