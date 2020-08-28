import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Axios from '../../axios';
import { useParams, useHistory } from 'react-router-dom';

import RestaurantMap from '../Shared/Map';
import Header from '../Shared/Header';
import MarquesinaOpacity from '../Shared/MarquesinaOpacity';
import Footer from '../Shared/Footer';
import { PageContainer, PageContent } from '../../style/page-layout';
import TileReview from '../Shared/TileReview';
import { BaseContentButton } from '../../style/buttons';

import IconClock from '../../assets/img/icon_clock.svg';
import IconMoney from '../../assets/img/icon_money.svg';
import { Icon } from '../../style/icon';

//////STYLE/////
const WidthController = styled.div`
  margin: 0 130px;
  width: 1200px;
  display: grid;
  grid-template-columns: 840px 360px;
  margin-top: 30px;
`;

const LeftColumn = styled.div`
  padding-right: 60px;
`;

const RightColumn = styled.div``;

const RestaurantMarquesina = styled.div`
  width: 100vw;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.1);
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
`;

const RestaurantFilterHeader = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  margin-bottom: 30px;
`;

const RestaurantFilterInput = styled.input`
  height: 40px;
  border: 1px solid #ebebeb;
  background-color: white;
  padding: 0 10px;
  border-radius: 3px;
  width: 100%;
`;

const RestaurantButton = styled.button`
  height: 40px;
  padding: 0 20px;
  font-size: 16px;
  border-radius: 28px;
  border: none;
  background: #e47d31;
  color: white;
  cursor: pointer;
  margin-left: 20px;

  :hover {
    background: #cb7035;
  }
`;

const RestaurantDetail = styled.div`
  padding: 20px;
  background: white;
`;

const RestaurantDetailTitle = styled.p`
  font-size: 16px;
  color: #4c4c4c;
  margin-bottom: 2px;
`;

const RestaurantDetailContent = styled.p`
  margin-left: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const IconTextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

///// REACT ///////
const Restaurant = () => {
  const me = useSelector((state) => state.user);
  const [restaurantData, setRestaurantData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewFilter, setReviewFilter] = useState('');
  const { id } = useParams();
  const { push } = useHistory();

  // get restaurants
  const getRestaurant = () => {
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

  // get reviews
  const getReviews = () => {
    const url = `reviews/restaurant/${id}/`;

    Axios.get(url)
      .then((response) => {
        setReviews(response.data);
        console.log('Reviews retrieved');
      })
      .catch((error) => {
        console.log('Reviews', error.response);
      });
  };

  // load restaurant data once a valid token exists
  useEffect(() => {
    getRestaurant();
    getReviews();
  }, []);

  return (
    <PageContainer>
      <Header></Header>
      <PageContent>
        {Object.keys(restaurantData).length > 0 ? (
          <>
            <RestaurantMarquesina image={restaurantData.image}>
              <MarquesinaOpacity restaurant={restaurantData}>
                <RestaurantMap restaurant={restaurantData}></RestaurantMap>
              </MarquesinaOpacity>
            </RestaurantMarquesina>
            <WidthController>
              <LeftColumn>
                <RestaurantFilterHeader>
                  <RestaurantFilterInput
                    placeholder="Filter list..."
                    onChange={(e) => setReviewFilter(e.target.value)}
                  ></RestaurantFilterInput>
                  <RestaurantButton>FILTER</RestaurantButton>
                </RestaurantFilterHeader>
                {reviews.length > 0 ? (
                  <>
                    {reviews
                      .filter((review) => {
                        if (
                          review.content
                            .toLowerCase()
                            .includes(reviewFilter.toLowerCase()) ||
                          review.user.first_name
                            .toLowerCase()
                            .includes(reviewFilter.toLowerCase()) ||
                          review.user.last_name
                            .toLowerCase()
                            .includes(reviewFilter.toLowerCase())
                        ) {
                          return review;
                        }
                      })
                      .map((review) => (
                        <TileReview
                          key={review.id}
                          review={review}
                          fnReload={() => getReviews()}
                        ></TileReview>
                      ))}
                  </>
                ) : (
                  <>No reviews yet</>
                )}
              </LeftColumn>
              <RightColumn>
                <RestaurantDetail>
                  <IconTextWrapper>
                    <Icon src={IconClock}></Icon>
                    <RestaurantDetailContent>
                      {restaurantData.opening_hours}
                    </RestaurantDetailContent>
                  </IconTextWrapper>
                  <IconTextWrapper>
                    <Icon src={IconMoney}></Icon>
                    <RestaurantDetailContent>
                      {restaurantData.price_level}
                    </RestaurantDetailContent>
                  </IconTextWrapper>
                  <ButtonWrapper>
                    <BaseContentButton
                      onClick={() => push(`/createreview/${restaurantData.id}`)}
                    >
                      WRITE A REVIEW
                    </BaseContentButton>
                  </ButtonWrapper>
                  {restaurantData.user.id === me.userData.id ? (
                    <ButtonWrapper>
                      <BaseContentButton
                        onClick={() =>
                          push(`/restaurantedit/${restaurantData.id}`)
                        }
                      >
                        EDIT DATA
                      </BaseContentButton>
                    </ButtonWrapper>
                  ) : (
                    <></>
                  )}
                </RestaurantDetail>
              </RightColumn>
            </WidthController>
          </>
        ) : (
          <></>
        )}
      </PageContent>
      <Footer></Footer>
    </PageContainer>
  );
};

export default Restaurant;
