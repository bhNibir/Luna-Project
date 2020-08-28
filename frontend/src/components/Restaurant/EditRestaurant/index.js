import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Axios from '../../../axios';
import { useParams, useHistory } from 'react-router-dom';

import PageTitle from '../../Shared/PageTitle';
import { BaseContentButton } from '../../../style/buttons';
import Header from '../../Shared/Header';
import Footer from '../../Shared/Footer';
import { PageContent, PageContainer } from '../../../style/page-layout';
import { InputField, Selector } from '../../../style/input';

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
const EditRestaurant = (props) => {
  const me = useSelector((state) => state.user);
  const { id } = useParams();
  const { push } = useHistory();

  const [name, setName] = useState('');
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

  // get restaurants
  const getRestaurant = () => {
    const url = `restaurants/${id}/`;

    Axios.get(url)
      .then((response) => {
        setName(response.data.name);
        setCountry(response.data.country);
        setStreet(response.data.street);
        setCity(response.data.city);
        setZip(response.data.zip);
        setWebsite(response.data.website);
        setPhone(response.data.phone);
        setEmail(response.data.email);
        setOpeningHours(response.data.opening_hours);
        setPriceLevel(response.data.price_level);
        console.log('Restaurant data retrieved');
      })
      .catch((error) => {
        console.log('Restaurant', error.response);
      });
  };

  const editRestaurantButtonHandler = (event) => {
    event.preventDefault();

    const restaurantData = new FormData();
    restaurantData.append('name', name);
    restaurantData.append('country', country);
    restaurantData.append('street', street);
    restaurantData.append('city', city);
    restaurantData.append('zip', zip);
    restaurantData.append('website', website);
    restaurantData.append('phone', phone);
    restaurantData.append('email', email);
    restaurantData.append('opening_hours', opening_hours);
    restaurantData.append('price_level', price_level);
    if (image) {
      restaurantData.append('image', image);
    }

    editRestaurantAction(restaurantData);
  };

  // create restaurant
  const editRestaurantAction = (restaurantData) => {
    const url = `restaurants/${id}/`;
    const auth = 'Bearer ' + me.token;
    const headers = {
      headers: { Authorization: auth, 'Content-Type': 'multipart/form-data' },
    };

    Axios.patch(url, restaurantData, headers)
      .then((response) => {
        console.log('edit restaurant successful.');
        push(`/restaurant/${id}`);
      })
      .catch((error) => {
        console.log('edit restaurant failed', error.response.data);
      });
  };

  // load restaurant data once a valid token exists
  useEffect(() => {
    getRestaurant();
  }, []);

  return (
    <PageContainer>
      <Header></Header>
      <PageContent>
        {me.token ? (
          <>
            <NewRestaurantContainer onSubmit={editRestaurantButtonHandler}>
              <BottonAndTopContainer>
                <PageTitle pageTitle="EDIT RESTAURANT"></PageTitle>
              </BottonAndTopContainer>
              <InformationContainer>
                <FieldWrapper>
                  <FieldTitle>Name*</FieldTitle>
                  <InputField
                    defaultValue={name}
                    onChange={(event) => setName(event.target.value)}
                  ></InputField>
                </FieldWrapper>

                <FieldWrapper>
                  <FieldTitle>Country*</FieldTitle>
                  <InputField
                    onChange={(event) => setCountry(event.target.value)}
                    defaultValue={country}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Street*</FieldTitle>
                  <InputField
                    onChange={(event) => setStreet(event.target.value)}
                    defaultValue={street}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>City*</FieldTitle>
                  <InputField
                    onChange={(event) => setCity(event.target.value)}
                    defaultValue={city}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Zip</FieldTitle>
                  <InputField
                    onChange={(event) => setZip(event.target.value)}
                    defaultValue={zip}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Website</FieldTitle>
                  <InputField
                    onChange={(event) => setWebsite(event.target.value)}
                    defaultValue={website}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Phone</FieldTitle>
                  <InputField
                    onChange={(event) => setPhone(event.target.value)}
                    defaultValue={phone}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Email</FieldTitle>
                  <InputField
                    onChange={(event) => setEmail(event.target.value)}
                    defaultValue={email}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Opening hours</FieldTitle>
                  <InputField
                    onChange={(event) => setOpeningHours(event.target.value)}
                    defaultValue={opening_hours}
                  ></InputField>
                </FieldWrapper>
                <FieldWrapper>
                  <FieldTitle>Price level</FieldTitle>
                  <Selector
                    onChange={(event) => setPriceLevel(event.target.value)}
                    defaultValue={price_level}
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
                <BaseContentButton type="submit">UPDATE</BaseContentButton>
              </BottonAndTopContainer>
            </NewRestaurantContainer>
          </>
        ) : (
          <ErrorMessage>You need to log in to edit a restaurant.</ErrorMessage>
        )}
      </PageContent>
      <Footer></Footer>
    </PageContainer>
  );
};

export default EditRestaurant;
