import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from '../../axios';

import { PageContent, PageContainer } from '../../style/page-layout';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import SearchRestaurants from './SearchRestaurants';
import SearchReviews from './SearchReviews';
import SearchUsers from './SearchUsers';

//////////
// STYLE
//////////
const SearchBar = styled.div`
  width: 100vw;
  height: 60px;
  background: white;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  padding: 0 30px;
`;

const SearchField = styled.input`
  border: none;
  width: 100%;
  font-weight: bold;
  margin-right: 30px;
`;

const SearchSelector = styled.select`
  height: 100%;
  border: none;
  border-left: 1px solid #d8d8d8;
  padding: 0 20px;
`;

const TabSelector = styled.ul`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 640px;
  height: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const TabSelectorItem = styled.li`
  list-style: none;
  height: 100%;
  margin-bottom: -2px;
  border-bottom: 2px solid;
  border-bottom-color: ${(props) => (props.isActive ? '#E47D31' : '#d8d8d8')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #4c4c4c;
  font-weight: bold;

  :hover {
    border-bottom-color: #e47d31;
  }
`;

//////////
// REACT
//////////
const Search = (props) => {
  const search = props.location.search
    ? props.location.search.split('=')[1]
    : '';
  const [restaurants, setRestaurants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(search);
  const [searchCategory, setSearchCategory] = useState('');
  const [viewFilter, setViewFilter] = useState('RESTAURANTS');

  // get restaurants
  const getRestaurants = (searchTerm) => {
    const searchParam = searchTerm ? `?search=${searchTerm}` : '';
    const categoryParam = searchCategory ? `category/${searchCategory}/` : '';
    const url = 'restaurants/' + categoryParam + searchParam;

    Axios.get(url)
      .then((response) => {
        setRestaurants(response.data);
        console.log('Restaurants retrieved');
      })
      //.catch((error) => {
      //  console.log('Get restaurants failed', error.response.data);
      //});
  };

  // get users
  const getUsers = (searchTerm) => {
    const searchParam = searchTerm ? `?search=${searchTerm}` : '';
    const url = 'users/' + searchParam;

    Axios.get(url)
      .then((response) => {
        setUsers(response.data);
        console.log('Users retrieved');
      })
      //.catch((error) => {
      //  console.log('Get users failed', error.response.data);
      //});
  };

  // get reviews
  const getReviews = (searchTerm) => {
    const searchParam = searchTerm ? `?search=${searchTerm}` : '';
    const url = 'reviews/' + searchParam;

    Axios.get(url)
      .then((response) => {
        setReviews(response.data);
        console.log('Reviews retrieved');
      })
      //.catch((error) => {
      //  console.log('Get reviews failed', error.response.data);
      //});
  };

  // get categories
  const getCategories = () => {
    const url = `category/`;

    Axios.get(url)
      .then((response) => {
        setCategories(response.data);
        console.log('Categories retrieved');
      })
      // .catch((error) => {
      //   console.log('Get categories failed', error.response.data);
      // });
  };

  // manage search field changes
  const onSearchFieldChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // manage category dropdown changes
  const onCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  // helper function to render main content
  const renderContent = () => {
    switch (viewFilter) {
      case 'RESTAURANTS':
        return (
          <SearchRestaurants restaurants={restaurants}></SearchRestaurants>
        );
      case 'REVIEWS':
        return (
          <SearchReviews
            reviews={reviews}
            fnReload={() => getReviews(searchTerm)}
          ></SearchReviews>
        );
      case 'USERS':
        return <SearchUsers users={users}></SearchUsers>;
      default:
        return <p>Invalid filter...</p>;
    }
  };

  // load data at start and when search term is changed
  useEffect(() => {
    if (categories.length === 0) getCategories();

    switch (viewFilter) {
      case 'RESTAURANTS':
        getRestaurants(searchTerm);
        break;
      case 'REVIEWS':
        getReviews(searchTerm);
        break;
      case 'USERS':
        getUsers(searchTerm);
        break;
      default:
        console.log('Invalid filter');
    }
  }, [searchTerm, viewFilter, searchCategory, categories]);

  return (
    <PageContainer>
      <Header></Header>
      <PageContent>
        <SearchBar>
          <SearchField
            onChange={onSearchFieldChange}
            type="search"
            placeholder="Search..."
            defaultValue={searchTerm}
          ></SearchField>
          {viewFilter === 'RESTAURANTS' ? (
            <SearchSelector onChange={onCategoryChange}>
              <option defaultValue="" value="">
                All
              </option>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.title}
                  </option>
                ))
              ) : (
                <></>
              )}
            </SearchSelector>
          ) : (
            <></>
          )}
        </SearchBar>
        <TabSelector>
          <TabSelectorItem
            isActive={viewFilter === 'RESTAURANTS'}
            onClick={() => setViewFilter('RESTAURANTS')}
          >
            RESTAURANTS
          </TabSelectorItem>
          <TabSelectorItem
            isActive={viewFilter === 'REVIEWS'}
            onClick={() => setViewFilter('REVIEWS')}
          >
            REVIEWS
          </TabSelectorItem>
          <TabSelectorItem
            isActive={viewFilter === 'USERS'}
            onClick={() => setViewFilter('USERS')}
          >
            USERS
          </TabSelectorItem>
        </TabSelector>
        {renderContent()}
      </PageContent>
      <Footer></Footer>
    </PageContainer>
  );
};

export default Search;
