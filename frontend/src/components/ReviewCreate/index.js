import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import ReactStars from 'react-rating-stars-component';
import styled from 'styled-components';
import Axios from '../../axios';
import { PageContainer, PageContent } from '../../style/page-layout';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import MarquesinaOpacity from '../Shared/MarquesinaOpacity';

//////////
// STYLE
//////////

const Button = styled.button`
  width: 259px;
  height: 56px;
  border-radius: 28px;
  border: none;
  background: #e47d31;
  color: white;
  justify-self: right;
  cursor: pointer;
  :hover {
    background: #cb7035;
  }
`;

const RestaurantImage = styled.div`
  width: 100vw;
  height: 200px;
  background: lightgrey;
  background-image: ${(props) => `url(${props.image})`};
  background-position: center;
  background-size: cover;
  background-repeat: none;
`;

const ReviewContentWrapper = styled.div`
  margin: 30px;
  width: 1200px;
  display: grid;
  justify-content: center;
`;

const TextArea = styled.textarea`
  width: 880px;
  height: 300px;
  max-width: 880px;
  max-height: 300px;
  min-width: 880px;
  min-height: 300px;
  margin-top: 23px;
  margin-bottom: 16px;
  padding: 18px;
  border: 1px solid #e3e3e3;
  border-radius: 3px;
  ::placeholder {
    color: #bbb7b7;
  }
`;

const H2 = styled.h2`
  font-weight: 300;
  font-size: 20px;
  line-height: 23px;
  color: #7e7e7e;
  height: 14px;
  padding-left: 20px;
`;

const StarsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  left: 40%;
  top: 50%;
  display: flex;
  justify-content: flex-start;
`;

//////////
// REACT
//////////

const ReviewCreate = () => {
  const [userRating, setUserRating] = useState(0);
  const [userReviewContent, setUserReviewContent] = useState('');
  const { token } = useSelector((state) => state.user);
  const [restaurantData, setRestaurantData] = useState([]);
  const { id } = useParams();
  const { push } = useHistory();

  // get restaurants
  const getRestaurants = () => {
    const url = `restaurants/${id}/`;

    Axios.get(url)
      .then((response) => {
        setRestaurantData(response.data);
        console.log('Restaurant retrieved');
      })
      .catch((error) => {
        console.log('Restaurant', error.response);
      });
  };

  // load restaurant data once a valid token exists
  useEffect(() => {
    getRestaurants();
  }, []);

  // post review data
  const postReviewData = () => {
    const url = `reviews/new/${id}/`;
    const auth = 'Bearer ' + token;
    const headers = { headers: { Authorization: auth } };
    const data = {
      content: userReviewContent,
      rating: userRating,
    };

    Axios.post(url, data, headers)
      .then((response) => {
        console.log('Review created');
        push(`/restaurant/${id}/`);
      })
      .catch((error) => {
        console.log('Review creation error', error.response.data);
      });
  };

  return (
    <PageContainer>
      <Header />
      <PageContent>
        {token ? (
          <>
            <RestaurantImage image={restaurantData.image}>
              <MarquesinaOpacity
                restaurant={restaurantData}
              ></MarquesinaOpacity>
            </RestaurantImage>
            <ReviewContentWrapper>
              <StarsContainer>
                <ReactStars
                  size={50}
                  color1={'#F0F0F0'}
                  half={false}
                  onChange={(newRating) => {
                    console.log(newRating);
                    setUserRating(newRating);
                  }}
                />
                <H2>Select your rating</H2>
              </StarsContainer>
              <TextArea
                placeholder="Your review help others learn about great local businesses. Please don't review if you received a freebie for writing this review, or if you are connected in any way to the owner or employees."
                onChange={(e) => setUserReviewContent(e.target.value)}
              ></TextArea>
              <Button onClick={postReviewData}>Submit</Button>
            </ReviewContentWrapper>
          </>
        ) : (
          <>{push(`/login?next=createreview/${id}`)}</>
        )}
      </PageContent>
      <Footer />
    </PageContainer>
  );
};

export default ReviewCreate;
