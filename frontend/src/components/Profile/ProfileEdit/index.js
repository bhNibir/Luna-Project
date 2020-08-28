import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InputField } from '../../../style/input';
import Axios from '../../../axios';
import { useSelector } from 'react-redux';
import { H2 } from '../../../style/titles';
import { decodeMessage } from '../../../lib/helpers';

const EditUserProfileContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FieldTitle = styled.p`
  color: #979797;
  font-weight: bold;
  margin-bottom: 8px;
`;

const InputArea = styled.input`
  width: 80%;
  height: 52px;
  border: 1px solid #ebebeb;
  background-color: white;
  padding: 0 15px;
  border-radius: 3px;
`;

const DescriptionField = styled.input`
  width: 80%;
  height: 88px;
  border: 1px solid #ebebeb;
  background-color: white;
  padding: 0 15px;
  border-radius: 3px;
`;

const BottonContainer = styled.div`
  height: 52px;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SaveButton = styled.button`
  width: 200px;
  height: 56px;
  border-radius: 28px;
  border: none;
  background: #e47d31;
  color: white;
  cursor: pointer;

  :hover {
    background: #cb7035;
  }
`;

//////////
// REACT
//////////

const ProfileEdit = (props) => {
  const me = useSelector((state) => state.user);
  const [username, setUsername] = useState(me.userData.username);
  const [first_name, setFirst_name] = useState(me.userData.first_name);
  const [last_name, setLast_name] = useState(me.userData.last_name);
  const [email, setEmail] = useState(me.userData.email);
  const [location, setLocation] = useState(me.userData.location);
  const [phone, setPhone] = useState(me.userData.phone || '');
  const [things_i_love, setThings_i_love] = useState(
    me.userData.things_i_love || ''
  );
  const [description, setDescription] = useState(me.userData.description || '');

  const editProfileAction = (profileData) => {
    const url = 'users/me/';
    const auth = 'Bearer ' + me.token;
    const headers = {
      headers: { Authorization: auth, 'Content-Type': 'multipart/form-data' },
    };

    Axios.patch(url, profileData, headers)
      .then((response) => {
        console.log('Edit Profile successful.', response.status);
        props.fnGoHome();
        props.fnReload();
      })
      .catch((error) => {
        console.log('Edit Profile failed', error.response);
        decodeMessage(error.response.data);
      });
  };

  const setData = (data) => {
    setUsername(data.username);
    setFirst_name(data.first_name);
    setLast_name(data.last_name);
    setEmail(data.email);
    setLocation(data.location);
    setPhone(data.phone || '');
    setThings_i_love(data.things_i_love || '');
    setDescription(data.description || '');
  };

  useEffect(() => {
    setData(me.userData);
  }, [me]);

  const edithProfileButtonHandler = (event) => {
    event.preventDefault();
    const newPicture = props.fnGetPicture();
    const profileData = new FormData();
    profileData.append('username', username);
    profileData.append('first_name', first_name);
    profileData.append('last_name', last_name);
    profileData.append('email', email);
    profileData.append('location', location);
    if (phone) {
      profileData.append('phone', phone);
    }
    if (things_i_love) {
      profileData.append('things_i_love', things_i_love);
    }
    if (description) {
      profileData.append('description', description);
    }
    if (newPicture) {
      profileData.append('profile_picture', newPicture);
    }

    editProfileAction(profileData);
  };

  return (
    <>
      <H2>EDIT PROFILE</H2>
      <EditUserProfileContainer onSubmit={edithProfileButtonHandler}>
        <FieldWrapper>
          <FieldTitle>Username</FieldTitle>
          <InputField
            defaultValue={props.userData.username}
            onChange={(event) => setUsername(event.target.value)}
          ></InputField>
        </FieldWrapper>
        <FieldWrapper>
          <FieldTitle>First name</FieldTitle>
          <InputField
            defaultValue={props.userData.first_name}
            onChange={(event) => setFirst_name(event.target.value)}
          ></InputField>
        </FieldWrapper>
        <FieldWrapper>
          <FieldTitle>Last name</FieldTitle>
          <InputField
            defaultValue={props.userData.last_name}
            onChange={(event) => setLast_name(event.target.value)}
          ></InputField>
        </FieldWrapper>
        <FieldWrapper>
          <FieldTitle>E-mail</FieldTitle>
          <InputField
            defaultValue={props.userData.email}
            onChange={(event) => setEmail(event.target.value)}
          ></InputField>
        </FieldWrapper>
        <FieldWrapper>
          <FieldTitle>Location</FieldTitle>
          <InputField
            defaultValue={props.userData.location}
            onChange={(event) => setLocation(event.target.value)}
          ></InputField>
        </FieldWrapper>
        <FieldWrapper>
          <FieldTitle>Phone</FieldTitle>
          <InputField
            defaultValue={props.userData.phone}
            onChange={(event) => setPhone(event.target.value)}
            type="tel"
          ></InputField>
        </FieldWrapper>
        <FieldWrapper>
          <FieldTitle>Things I love</FieldTitle>
          <InputArea
            defaultValue={props.userData.things_i_love}
            onChange={(event) => setThings_i_love(event.target.value)}
          ></InputArea>
        </FieldWrapper>
        <FieldWrapper>
          <FieldTitle>Description</FieldTitle>
          <DescriptionField
            defaultValue={props.userData.description}
            onChange={(event) => setDescription(event.target.value)}
          ></DescriptionField>
        </FieldWrapper>
        <BottonContainer>
          <SaveButton type="submit">Update</SaveButton>
        </BottonContainer>
      </EditUserProfileContainer>
    </>
  );
};

export default ProfileEdit;
