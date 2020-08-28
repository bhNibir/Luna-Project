import styled from 'styled-components';
import React from 'react';
import { RatingStars } from '../../../style/stars';

//Style component

const MainContainer = styled.div`
  width: 100vw;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  padding-top: 40px;
`;

const MarqOpaText = styled.h2`
  color: white;
  font-size: 30px;
  margin-bottom: 10px;
`;

const MarqDesText = styled.p`
  color: white;
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const MarqReviews = styled.p`
  color: white;
  font-size: 18px;
  font-weight: 300;
  margin-left: 15px;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const WidthController = styled.div`
  width: 1200px;
  position: relative;
`;

//React component
const MarquesinaOpacity = (props) => {
  return (
    <MainContainer>
      {Object.keys(props.restaurant).length > 0 ? (
        <WidthController>
          <MarqOpaText>{props.restaurant.name}</MarqOpaText>
          <MarqDesText>{props.restaurant.category.title}</MarqDesText>
          <RatingWrapper>
            <RatingStars
              rating={props.restaurant.rating.rating__avg}
            ></RatingStars>
            <MarqReviews>{props.restaurant.count_reviews} Reviews</MarqReviews>
          </RatingWrapper>
          {props.children}
        </WidthController>
      ) : (
        <> </>
      )}
    </MainContainer>
  );
};
export default MarquesinaOpacity;
