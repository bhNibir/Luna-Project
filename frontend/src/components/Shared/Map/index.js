import styled from 'styled-components';
import React from 'react';

import MapImage from '../../../assets/img/map.png';
import IconPhone from '../../../assets/img/icon_phone.svg';
import IconPin from '../../../assets/img/icon_pin.svg';
import IconWeb from '../../../assets/img/icon_web.svg';
import { Icon } from '../../../style/icon';

///STYLES////
const MapMainContainer = styled.div`
  width: 360px;
  height: 280px;
  position: absolute;
  right: 0;
  top: 5px;
  background-color: white;
  background-image: url(${MapImage});
  background-position: center;
  background-size: cover;
  background-repeat: none;
  border-radius: 3px;
  overflow: hidden;
`;

const InfoWrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 15px 20px;
  padding-bottom: 15px;
  width: 100%;
  position: absolute;
  bottom: 0;
  font-weight: normal;
`;

const RestaurantInfo = styled.p`
  display: block;
  text-decoration: none;
  margin-left: 10px;
  color: black;
`;

const RestaurantLink = styled.a`
  display: block;
  color: black;
  text-decoration: none;
  margin-left: 10px;

  :hover {
    text-decoration: underline;
  }
`;

const IconTextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

//React component
const RestaurantMap = (props) => {
  return (
    <MapMainContainer>
      <InfoWrapper>
        <IconTextWrapper>
          <Icon src={IconPin}></Icon>
          <RestaurantInfo>{props.restaurant.street}</RestaurantInfo>
        </IconTextWrapper>
        <IconTextWrapper>
          <Icon src={IconPhone}></Icon>
          <RestaurantInfo>{props.restaurant.phone}</RestaurantInfo>
        </IconTextWrapper>
        <IconTextWrapper>
          <Icon src={IconWeb}></Icon>
          <RestaurantLink href={props.restaurant.website}>
            {props.restaurant.website}
          </RestaurantLink>
        </IconTextWrapper>
      </InfoWrapper>
    </MapMainContainer>
  );
};
export default RestaurantMap;
