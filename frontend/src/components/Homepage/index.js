import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Axios from '../../axios';

import { BaseContentButton } from '../../style/buttons';
import PageTitle from '../Shared/PageTitle';
import TileRestaurant from '../Shared/TileRestaurant';
import Header from '../Shared/Header';
import { PageContainer, PageContent } from '../../style/page-layout';
import RestaurantImage from '../../assets/img/Restaurant_Food.jpg';
import Footer from '../Shared/Footer';
import { TileGrid } from '../../style/tile';

//////////
// STYLE
//////////
const SearchContainer = styled.form`
  height: 351px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${RestaurantImage});
  background-position: center;
  background-size: cover;
  background-repeat: none;
  margin-bottom: 20px;
`;

const SearchField = styled.input`
  width: 30%;
  height: 55px;
  border: 1px solid #ebebeb;
  background-color: white;
  padding-left: 23px;
  border-radius: 3px;
  margin-right: 25px;
`;

//////////
// REACT
//////////
const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const { push } = useHistory();

  // get restaurants
  const getRestaurants = () => {
    const url = 'home/';

    Axios.get(url)
      .then((response) => {
        setRestaurants(response.data);
        console.log('Restaurants retrieved');
      })
      .catch((error) => {
        console.log('Get restaurants failed', error.response.data);
      });
  };

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    push(`/search?search=${searchTerm}`);
  };

  // load data at start
  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <PageContainer>
      <Header></Header>
      <PageContent>
        <SearchContainer onSubmit={onSearchSubmit}>
          <SearchField
            onChange={onSearchChange}
            placeholder="Search..."
          ></SearchField>
          <BaseContentButton type="submit">Search</BaseContentButton>
        </SearchContainer>
        <PageTitle pageTitle="BEST RATED RESTAURANTS"></PageTitle>
        <TileGrid>
          {restaurants.map((restaurant) => (
            <TileRestaurant
              key={restaurant.id}
              restaurant={restaurant}
            ></TileRestaurant>
          ))}
        </TileGrid>
      </PageContent>
      <Footer></Footer>
    </PageContainer>
  );
};

export default Homepage;
