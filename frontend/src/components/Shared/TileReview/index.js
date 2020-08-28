import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Axios from '../../../axios';

import TileUserHeader from '../TileUserHeader';
import { RatingStars } from '../../../style/stars';
import { SplitButtonWrapper, SplitButton } from '../../../style/buttons';
import ReviewCommentor from '../ReviewCommentor';

/////////
// STYLE
////////
const ReviewTile = styled.div`
  width: 100%;
  background: white;
  margin-bottom: 30px;
`;

const ReviewTileContent = styled.div`
  padding: 20px;
`;

const ReviewContent = styled.p`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const CommentsContainer = styled.div`
  padding: 20px;
  border-top: 1px solid #ebebeb;
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

////////
// REACT
////////
const TileReview = (props) => {
  const { token } = useSelector((state) => state.user);
  const [commentOpen, setCommentOpen] = useState(false);

  // toggle commentor
  const toggleComment = () => {
    setCommentOpen(!commentOpen);
  };

  // like a review
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

  // create comment
  const createComment = (reviewID, comment) => {
    if (token) {
      const url = `comments/new/${reviewID}/`;
      const auth = 'Bearer ' + token;
      const headers = { headers: { Authorization: auth } };
      const data = { content: comment };

      Axios.post(url, data, headers)
        .then((response) => {
          console.log('Comment created');
          props.fnReload();
        })
        .catch((error) => {
          console.log('Comment create error', error.response.data);
        });
    } else {
      console.log('creating comments works for logged in users');
    }
  };

  return (
    <ReviewTile key={props.review.id}>
      <TileUserHeader user={props.review.user}></TileUserHeader>
      <ReviewTileContent>
        <RatingStars rating={props.review.rating}></RatingStars>
        <ReviewContent>{props.review.content}</ReviewContent>
        <SplitButtonWrapper>
          <SplitButton onClick={() => likeReview(props.review.id)}>
            Likes: {props.review.count_likes}
          </SplitButton>
          <SplitButton onClick={toggleComment}>
            Comments: {props.review.count_comments}
          </SplitButton>
        </SplitButtonWrapper>
      </ReviewTileContent>
      {commentOpen ? (
        <ReviewCommentor
          fnCreate={createComment}
          fnClose={toggleComment}
          reviewID={props.review.id}
        ></ReviewCommentor>
      ) : (
        <></>
      )}
      {props.review.count_comments ? (
        <CommentsContainer>
          <CommentsTitle>Comments:</CommentsTitle>
          {props.review.comment.map((comment) => (
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
    </ReviewTile>
  );
};

export default TileReview;
