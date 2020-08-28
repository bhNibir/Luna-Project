import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Axios from '../../../axios';

import { TileTopLine, TileGrid, TileContainer } from '../../../style/tile';
import { SplitButtonWrapper, SplitButton } from '../../../style/buttons';
import TileUserHeader from '../../Shared/TileUserHeader';
import { RatingStars } from '../../../style/stars';
import { Link } from 'react-router-dom';

//////////
// STYLE
//////////
const ReviewContainer = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ebebeb;
`;

const RestaurantName = styled(Link)`
  font-weight: bold;
  color: #e47d31;
  margin-bottom: 10px;
  text-decoration: none;
  display: block;
`;

const ReviewText = styled.p`
  color: #4c4c4c;
  font-size: 18px;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  padding: 15px;
`;

const CommentsContainer = styled.div`
  padding: 0 15px 15px 15px;
`;

const CommentsTitle = styled.p`
  font-weight: 300;
  margin-bottom: 10px;
`;

const CommentWrapper = styled.div`
  margin-bottom: 15px;
`;

const CommentAuthor = styled.p`
  font-weight: bold;
  color: #e47d31;
  font-size: 16px;
  margin-bottom: 2px;
`;

const CommentDetail = styled.p`
  font-size: 16px;
`;

//////////
// REACT
//////////
const SearchReviews = (props) => {
  const { token } = useSelector((state) => state.user);

  const likeReview = (id) => {
    if (token) {
      const url = `reviews/like/${id}/`;
      const auth = 'Bearer ' + token;
      const headers = { headers: { Authorization: auth } };
      const data = { test: 'test' };

      Axios.post(url, data, headers)
        .then((response) => {
          console.log('Like toggled');
          props.fnReload();
        })
        .catch((error) => {
          console.log('Like toggle error', error.response.data);
        });
    } else {
      console.log('like toggle only works for logged in users');
    }
  };

  return (
    <>
      {props.reviews.length > 0 ? (
        <TileGrid>
          {props.reviews.map((review) => (
            <TileContainer key={review.id}>
              <TileTopLine />
              <TileUserHeader user={review.user}></TileUserHeader>
              <ReviewContainer>
                <RestaurantName to={`/restaurant/${review.restaurant.id}`}>
                  {review.restaurant.name}
                </RestaurantName>
                <RatingStars rating={review.rating}></RatingStars>
                <ReviewText>{review.content || '-'}</ReviewText>
              </ReviewContainer>
              <ButtonContainer>
                <SplitButtonWrapper>
                  <SplitButton onClick={() => likeReview(review.id)}>
                    Likes: {review.count_likes}
                  </SplitButton>
                  <SplitButton>Comments: {review.count_comments}</SplitButton>
                </SplitButtonWrapper>
              </ButtonContainer>
              {review.count_comments ? (
                <CommentsContainer>
                  <CommentsTitle>Comments:</CommentsTitle>
                  {review.comment.map((comment) => (
                    <CommentWrapper key={comment.id}>
                      <CommentAuthor>
                        {comment.user.first_name} {comment.user.last_name}
                      </CommentAuthor>
                      <CommentDetail>{comment.content}</CommentDetail>
                    </CommentWrapper>
                  ))}
                </CommentsContainer>
              ) : (
                <></>
              )}
            </TileContainer>
          ))}
        </TileGrid>
      ) : (
        'No reviews to show.'
      )}
    </>
  );
};

export default SearchReviews;
