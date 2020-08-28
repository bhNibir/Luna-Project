import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Axios from '../../axios';

import PageTitle from '../Shared/PageTitle';
import { BaseContentButton } from '../../style/buttons';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import { PageContent, PageContainer } from '../../style/page-layout';
import { InputField, Selector } from '../../style/input';
import { decodeMessage } from '../../lib/helpers';

//////////
// STYLE
//////////
const NewRestaurantContainer = styled.form`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const InformationContainer = styled.div`
  flex: 2;
  width: auto;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px 60px;
  margin-bottom: 30px;
`;

const BottonAndTopContainer = styled.div`
  flex: 1;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FieldWrapper = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FieldTitle = styled.p`
  color: #979797;
  font-weight: bold;
  margin-bottom: 8px;
`;

const ErrorMessage = styled.p`
  margin-top: 30px;
  font-weight: bold;
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileButton = styled.div`
  width: 200px;
  height: 52px;
  border-radius: 28px;
  border: none;
  background: #e47d31;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background: #cb7035;
  }
`;

//////////
// REACT
//////////
const CreateNewRestaurant = (props) => {
  const me = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [price_level, setPriceLevel] = useState('');
  const [image, setImage] = useState('');
  const history = useHistory();

  const createRestaurantButtonHandler = (event) => {
    event.preventDefault();

    const restaurantData = new FormData();
    restaurantData.append('name', name);
    restaurantData.append('category', category);
    restaurantData.append('country', country);
    restaurantData.append('street', street);
    restaurantData.append('city', city);
    restaurantData.append('zip', zip);
    restaurantData.append('website', website);
    restaurantData.append('phone', phone);
    restaurantData.append('email', email);
    restaurantData.append('opening_hours', opening_hours);
    restaurantData.append('price_level', price_level);
    restaurantData.append('image', image);

    createRestaurantAction(restaurantData);
  };

  // create restaurant
  const createRestaurantAction = (restaurantData) => {
    const url = 'restaurants/new/';
    const auth = 'Bearer ' + me.token;
    const headers = {
      headers: { Authorization: auth, 'Content-Type': 'multipart/form-data' },
    };

    Axios.post(url, restaurantData, headers)
      .then((response) => {
        console.log('create restaurant successful.');
        history.push('/successcreatedrestaurant');
      })
      .catch((error) => {
        console.log('create restaurant failed', error.response.data);
        decodeMessage(error.response.data);
      });
  };

  // get categories
  const getCategories = () => {
    const url = `category/`;

    Axios.get(url)
      .then((response) => {
        setCategories(response.data);
        console.log('Categories retrieved');
      })
      .catch((error) => {
        console.log('Get categories failed', error.response.data);
      });
  };

  // get categories on page load
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <PageContainer>
      <Header></Header>
      <PageContent>
        {me.token ? (
          <>
            <NewRestaurantContainer onSubmit={createRestaurantButtonHandler}>
              <BottonAndTopContainer>
                <PageTitle pageTitle="CREATE NEW RESTAURANT"></PageTitle>
              </BottonAndTopContainer>
              <InformationContainer>
                <FieldWrapper>
                  <FieldTitle>Name*</FieldTitle>
                  <InputField
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Category*</FieldTitle>
                  <Selector
                    onChange={(event) => setCategory(event.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Please select
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
                  </Selector>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Country*</FieldTitle>
                  <InputField
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Street*</FieldTitle>
                  <InputField
                    value={street}
                    onChange={(event) => setStreet(event.target.value)}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>City*</FieldTitle>
                  <InputField
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Zip</FieldTitle>
                  <InputField
                    value={zip}
                    onChange={(event) => setZip(event.target.value)}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Website</FieldTitle>
                  <InputField
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Phone</FieldTitle>
                  <InputField
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Email</FieldTitle>
                  <InputField
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Opening hours</FieldTitle>
                  <InputField
                    value={opening_hours}
                    onChange={(event) => setOpeningHours(event.target.value)}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Price level</FieldTitle>
                  <Selector
                    onChange={(event) => setPriceLevel(event.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    <option value="$">$</option>
                    <option value="$$">$$</option>
                    <option value="$$$">$$$</option>
                  </Selector>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Image</FieldTitle>
                  <label>
                    <HiddenInput
                      type="file"
                      onChange={(event) => setImage(event.target.files[0])}
                      accept=".jpg, .jpeg, .png"
                    ></HiddenInput>
                    <FileButton>
                      {image ? 'Change...' : 'Choose file...'}
                    </FileButton>
                  </label>
                </FieldWrapper>
              </InformationContainer>
              <BottonAndTopContainer>
                <BaseContentButton type="submit">CREATE</BaseContentButton>
              </BottonAndTopContainer>
            </NewRestaurantContainer>
          </>
        ) : (
          <ErrorMessage>
            You need to log in to create a restaurant.
          </ErrorMessage>
        )}
      </PageContent>
      <Footer></Footer>
    </PageContainer>
  );
};

export default CreateNewRestaurant;
