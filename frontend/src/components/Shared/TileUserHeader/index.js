import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const UserHeader = styled(Link)`
  display: flex;
  border-bottom: 1px solid #ebebeb;
  text-decoration: none;
`;

const UserPicture = styled.div`
  height: 70px;
  width: 70px;
  background: rgba(0, 0, 0, 0.03);
  background-image: ${(props) => `url(${props.image})`};
  background-position: center;
  background-size: cover;
  background-repeat: none;
  border-style: none;
`;

const UserHeaderDetails = styled.div`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserHeaderName = styled.p`
  font-weight: bold;
  color: #e47d31;
  margin-bottom: 2px;
`;

const UserHeaderReviewTotal = styled.p`
  color: #4c4c4c;
  font-size: 16px;
`;

const TileUserHeader = (props) => {
  return (
    <UserHeader to={`/profile/${props.user.id}`}>
      <UserPicture image={props.user.profile_picture}></UserPicture>
      <UserHeaderDetails>
        <UserHeaderName>
          {props.user.first_name} {String(props.user.last_name).charAt(0)}.
        </UserHeaderName>
        <UserHeaderReviewTotal>
          {props.user.count_reviews} reviews
        </UserHeaderReviewTotal>
      </UserHeaderDetails>
    </UserHeader>
  );
};

export default TileUserHeader;
