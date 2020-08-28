import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Axios from '../../axios';

import { PageContainer, PageContent } from '../../style/page-layout';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import { H2 } from '../../style/titles';
import ProfileReviews from './ProfileReviews';
import ProfileComments from './ProfileComments';
import ProfileRestaurants from './ProfileRestaurants';
import ProfileEdit from './ProfileEdit';
import ProfileBannerImage from '../../assets/img/background-zurich.jpg';
import { apiUserGetData } from '../../store/user';

//////////
// STYLE
//////////
const ProfileBanner = styled.div`
  width: 100vw;
  height: 220px;
  background: lightgrey;
  background-image: url(${ProfileBannerImage});
  background-position: center;
  background-size: cover;
  background-repeat: none;
`;

const ProfileBannerDarken = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const ProfileContentWrapper = styled.div`
  margin: 0 130px;
  width: 1200px;
  display: grid;
  grid-template-columns: 240px 1fr 320px;
  grid-gap: 30px;
`;

const ProfileLeftColumn = styled.div`
  margin-top: -120px;
  position: relative;
`;

const ProfileMiddleColumn = styled.div`
  margin-top: 30px;
`;

const ProfileRightColumn = styled.div`
  margin-top: 30px;
`;

const ProfileSummary = styled.div`
  position: absolute;
  left: 270px;
  top: 0;
  color: white;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
  width: 400px;
`;

const ProfileSummaryName = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const ProfileSummaryDetail = styled.p`
  font-weight: 300;
  font-size: 18px;
  margin-bottom: 6px;
`;

const ProfilePicture = styled.div`
  background-color: white;
  background-image: ${(props) => `url(${props.image})`};
  background-position: center;
  background-size: cover;
  background-repeat: none;
  width: 240px;
  height: 240px;
`;

const ProfileMenuTitle = styled.div`
  color: #4c4c4c;
  margin: 20px 0;
  font-weight: bold;
  width: 100%;
  text-align: center;
`;

const ProfileMenu = styled.ul`
  border-top: 1px solid #979797;
`;

const ProfileMenuItem = styled.li`
  height: 45px;
  list-style: none;
  border-bottom: 1px solid #979797;
  background: white;
  display: flex;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
  border-left: 5px solid
    ${(props) => (props.isActive ? props.theme.colorMain : 'transparent')};

  :hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ProfileAboutTitle = styled.p`
  margin-top: 30px;
  margin-bottom: 8px;
  font-weight: bold;
`;

const ProfileAboutDetail = styled.p`
  font-weight: 300px;
`;

const Placeholder = styled.div`
  width: 240px;
  height: 240px;
  background-color: rgba(0, 0, 0, 0.2);
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const HiddenInputWrapper = styled.label`
  width: 100%;
  height: 100%;
  background: green;
`;

const HiddenInput = styled.input`
  display: none;
`;

//////////
// REACT
//////////
const Profile = () => {
  const me = useSelector((state) => state.user);
  const { id } = useParams();
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [tempUserID, setTempUserID] = useState('');
  const [userData, setUserData] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [userRestaurants, setUserRestaurants] = useState([]);
  const [viewFilter, setViewFilter] = useState('REVIEWS');
  const [profilePictureTemp, setProfilePictureTemp] = useState(null);

  // get basic user data
  const getUserData = (userID) => {
    const url = `users/${userID}/`;

    Axios.get(url)
      .then((response) => {
        setUserData(response.data);
        console.log('User data retrieved');
      })
      .catch((error) => {
        console.log('Profile get user data', error.response.data);
      });
  };

  // get user reviews
  const getUserReviews = (userID) => {
    const url = `reviews/user/${userID}/`;

    Axios.get(url)
      .then((response) => {
        setUserReviews(response.data);
        console.log('User reviews retrieved');
      })
      .catch((error) => {
        console.log('Profile get user reviews', error.response.data);
      });
  };

  // get user comments
  const getUserComments = (userID) => {
    const url = `comments/user/${userID}/`;

    Axios.get(url)
      .then((response) => {
        setUserComments(response.data);
        console.log('User comments retrieved');
      })
      .catch((error) => {
        console.log('Profile get user comments', error.response.data);
      });
  };

  // get user restaurants
  const getUserRestaurants = (userID) => {
    const url = `restaurants/user/${userID}/`;

    Axios.get(url)
      .then((response) => {
        setUserRestaurants(response.data);
        console.log('User restaurants retrieved');
      })
      .catch((error) => {
        console.log('Profile get user restaurants', error.response.data);
      });
  };

  // helper function used to tranform date
  const transformDate = (date) => {
    const inputDate = new Date(date);
    const options = { year: 'numeric', month: 'long' };
    return inputDate.toLocaleDateString('en-EN', options);
  };

  // helper function to render middle column content
  const renderContent = () => {
    switch (viewFilter) {
      case 'REVIEWS':
        return (
          <ProfileReviews
            reviews={userReviews}
            fnReload={() => getUserReviews(tempUserID)}
          ></ProfileReviews>
        );
      case 'COMMENTS':
        return (
          <ProfileComments
            comments={userComments}
            fnReload={() => getUserComments(tempUserID)}
          ></ProfileComments>
        );
      case 'RESTAURANTS':
        return (
          <ProfileRestaurants
            restaurants={userRestaurants}
            fnReload={() => getUserRestaurants(tempUserID)}
            showButton={tempUserID === me.userData.id}
          ></ProfileRestaurants>
        );
      case 'EDITPROFILE':
        return (
          <ProfileEdit
            userData={me.userData}
            fnReload={() => {
              getUserData(tempUserID);
            }}
            fnGetPicture={getProfilePicture}
            fnGoHome={() => {
              setViewFilter('REVIEWS');
              scrollUp();
              dispatch(apiUserGetData(me.token));
            }}
          ></ProfileEdit>
        );
      default:
        return <p>Invalid filter...</p>;
    }
  };

  // get the image file when updating the profile
  const getProfilePicture = () => {
    return profilePictureTemp;
  };

  // helper function for smooth scrolling
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  // load user data once a valid token exists
  useEffect(() => {
    const getID = id ? id : me.userData.id;
    if (getID) {
      setTempUserID(getID);
      getUserData(getID);
      getUserReviews(getID);
      getUserComments(getID);
      getUserRestaurants(getID);
    }
  }, [id, me]);

  return (
    <PageContainer>
      <Header />
      <PageContent>
        {id || me.userData.id ? (
          <>
            <ProfileBanner>
              <ProfileBannerDarken />
            </ProfileBanner>
            <ProfileContentWrapper>
              <ProfileLeftColumn>
                <ProfileSummary>
                  <ProfileSummaryName>
                    {userData.first_name} {String(userData.last_name).charAt(0)}
                    .
                  </ProfileSummaryName>
                  <ProfileSummaryDetail>
                    {userData.location}
                  </ProfileSummaryDetail>
                  <ProfileSummaryDetail>
                    {userData.count_comments} comments
                  </ProfileSummaryDetail>
                  <ProfileSummaryDetail>
                    {userData.count_reviews} reviews
                  </ProfileSummaryDetail>
                </ProfileSummary>
                <ProfilePicture
                  image={
                    profilePictureTemp !== null
                      ? URL.createObjectURL(profilePictureTemp)
                      : userData.profile_picture
                  }
                >
                  {viewFilter === 'EDITPROFILE' ? (
                    <HiddenInputWrapper>
                      <HiddenInput
                        type="file"
                        onChange={(e) => {
                          setProfilePictureTemp(e.target.files[0]);
                        }}
                      ></HiddenInput>
                      <Placeholder>Edit Picture</Placeholder>
                    </HiddenInputWrapper>
                  ) : (
                    <></>
                  )}
                </ProfilePicture>
                <ProfileMenuTitle>
                  {userData.first_name}'s Profile
                </ProfileMenuTitle>
                <ProfileMenu>
                  <ProfileMenuItem
                    isActive={viewFilter === 'REVIEWS'}
                    onClick={() => {
                      setViewFilter('REVIEWS');
                      getUserReviews(tempUserID);
                    }}
                  >
                    Reviews
                  </ProfileMenuItem>
                  <ProfileMenuItem
                    isActive={viewFilter === 'COMMENTS'}
                    onClick={() => {
                      setViewFilter('COMMENTS');
                      getUserComments(tempUserID);
                    }}
                  >
                    Comments
                  </ProfileMenuItem>
                  <ProfileMenuItem
                    isActive={viewFilter === 'RESTAURANTS'}
                    onClick={() => {
                      setViewFilter('RESTAURANTS');
                      getUserRestaurants(tempUserID);
                    }}
                  >
                    Restaurants
                  </ProfileMenuItem>
                  {userData.id === me.userData.id ? (
                    <ProfileMenuItem
                      isActive={viewFilter === 'EDITPROFILE'}
                      onClick={() => {
                        setViewFilter('EDITPROFILE');
                      }}
                    >
                      Edit Profile
                    </ProfileMenuItem>
                  ) : (
                    <></>
                  )}
                </ProfileMenu>
              </ProfileLeftColumn>
              <ProfileMiddleColumn>{renderContent()}</ProfileMiddleColumn>
              <ProfileRightColumn>
                <H2>About {userData.first_name}</H2>
                <ProfileAboutTitle>Location</ProfileAboutTitle>
                <ProfileAboutDetail>{userData.location}</ProfileAboutDetail>
                <ProfileAboutTitle>Luna member since</ProfileAboutTitle>
                <ProfileAboutDetail>
                  {transformDate(userData.joined_date)}
                </ProfileAboutDetail>
                <ProfileAboutTitle>Things I love</ProfileAboutTitle>
                <ProfileAboutDetail>
                  {userData.things_i_love || '-'}
                </ProfileAboutDetail>
                <ProfileAboutTitle>Description</ProfileAboutTitle>
                <ProfileAboutDetail>
                  {userData.description || '-'}
                </ProfileAboutDetail>
              </ProfileRightColumn>
            </ProfileContentWrapper>
          </>
        ) : (
          <>{push('/login?next=profile')}</>
        )}
      </PageContent>
      <Footer />
    </PageContainer>
  );
};

export default Profile;
