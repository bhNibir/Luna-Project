import React from 'react';
import styled from 'styled-components';

import { TileContainer, TileGrid, TileTopLine } from '../../../style/tile';
import TileUserHeader from '../../Shared/TileUserHeader';

//////////
// STYLE
//////////
const UserAbout = styled.div`
  padding: 15px;
`;

const UserAboutText = styled.p`
  color: #4c4c4c;
  font-size: 18px;
`;

//////////
// REACT
//////////
const SearchUsers = (props) => {
  return (
    <>
      {props.users.length > 0 ? (
        <TileGrid>
          {props.users.map((user) => (
            <TileContainer key={user.id}>
              <TileTopLine />
              <TileUserHeader user={user}></TileUserHeader>
              <UserAbout>
                <UserAboutText>{user.description || '-'}</UserAboutText>
              </UserAbout>
            </TileContainer>
          ))}
        </TileGrid>
      ) : (
        'No users to show.'
      )}
    </>
  );
};

export default SearchUsers;
