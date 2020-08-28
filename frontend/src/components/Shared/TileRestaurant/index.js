import styled from 'styled-components';
import React from 'react';
import { TileContainer, TileTopLine } from '../../../style/tile';
import { RatingStars } from '../../../style/stars';
import { Link } from 'react-router-dom';

//Style component

const RestaurantDetailsContainer = styled.div`
  color: black;
  padding: 15px;
`;

const RestaurantName = styled.p`
  margin-bottom: 8px;
  color: #e47d31;
  font-weight: bold;
`;

const RestaurantAddressLine = styled.p`
  font-size: 16px;
  margin-bottom: 4px;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-left: -2px;
`;

const ImageContainer = styled.div`
  height: 240px;
  width: auto;
  background: rgba(0, 0, 0, 0.05);
  background-image: ${(props) => `url(${props.image})`};
  background-position: center;
  background-size: cover;
  background-repeat: none;
`;

const NumberOfVotes = styled.p`
  font-weight: 300;
`;

const LinkWrapper = styled(Link)`
  text-decoration: none;
`;

// TODO: get percentage and number of votes from restaurant data
const TileRestaurant = (props) => {
  const restaurant = props.restaurant;
  return (
    <TileContainer>
      <TileTopLine />
      <LinkWrapper to={`/restaurant/${restaurant.id}`}>
        <RestaurantDetailsContainer>
          <RestaurantName>{restaurant.name}</RestaurantName>
          <RestaurantAddressLine>
            {restaurant.street || '-'}
          </RestaurantAddressLine>
          <RestaurantAddressLine>
            {restaurant.city || '-'}
          </RestaurantAddressLine>
          <RatingContainer>
            <RatingStars
              rating={props.restaurant.rating.rating__avg}
            ></RatingStars>
            <NumberOfVotes>{props.restaurant.count_reviews}</NumberOfVotes>
          </RatingContainer>
        </RestaurantDetailsContainer>
        <ImageContainer image={props.restaurant.image}></ImageContainer>
      </LinkWrapper>
    </TileContainer>
  );
};
export default TileRestaurant;
