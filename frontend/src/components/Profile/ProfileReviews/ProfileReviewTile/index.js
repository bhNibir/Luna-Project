import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Axios from '../../../../axios';
import { Link } from 'react-router-dom';

import { RatingStars } from '../../../../style/stars';
import { InputArea } from '../../../../style/input';
import { SmallButton, SmallButtonGrey } from '../../../../style/buttons';

//////////
// STYLE
//////////
const ReviewTile = styled.div`
  width: 100%;
  background: white;
  padding: 20px;
  color: #4c4c4c;
  height: auto;
  margin-bottom: 30px;
  display: block;
  text-decoration: none;
`;

const ReviewTileTitleBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 30px;
  align-items: center;
  margin-bottom: 10px;
`;

const ReviewTileTitle = styled(Link)`
  font-weight: bold;
  color: #e47d31;
  display: block;
  text-decoration: none;
`;

const ReviewTileContent = styled.p`
  margin-top: 10px;
  font-size: 18px;
  margin-left: 2px;
`;

const ReviewForm = styled.div`
  margin-top: 15px;
`;

const ReviewFormButtonBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

const Spacer = styled.div`
  width: 20px;
`;

//////////
// REACT
//////////
const ProfileReviewTile = (props) => {
  const me = useSelector((state) => state.user);
  const [tempContent, setTempContent] = useState('');

  const updateReview = (id) => {
    if (me.token) {
      const url = `reviews/${id}/`;
      const auth = 'Bearer ' + me.token;
      const headers = { headers: { Authorization: auth } };
      const data = { content: tempContent };

      Axios.patch(url, data, headers)
        .then((response) => {
          console.log('Review updated');
          props.fnReload();
        })
        .catch((error) => {
          console.log('Review update error', error.response.data);
        });
    } else {
      console.log('Update only works if you are logged in');
    }
  };

  const deleteReview = (id) => {
    if (me.token) {
      const url = `reviews/${id}/`;
      const auth = 'Bearer ' + me.token;
      const headers = { headers: { Authorization: auth } };

      Axios.delete(url, headers)
        .then((response) => {
          console.log('Review deleted');
          props.fnReload();
        })
        .catch((error) => {
          console.log('Review delete error', error.response.data);
        });
    } else {
      console.log('Delete only works if you are logged in');
    }
  };

  useEffect(() => {
    setTempContent(props.review.content);
  }, [props.review.content]);

  return (
    <ReviewTile>
      <ReviewTileTitleBar>
        <ReviewTileTitle to={`/restaurant/${props.review.restaurant.id}`}>
          {props.review.restaurant.name}
        </ReviewTileTitle>
      </ReviewTileTitleBar>
      <RatingStars rating={props.review.rating}></RatingStars>
      {props.review.user.id === me.userData.id ? (
        <ReviewForm>
          <InputArea
            defaultValue={props.review.content}
            onChange={(e) => setTempContent(e.target.value)}
          ></InputArea>
          <ReviewFormButtonBar>
            {tempContent !== props.review.content ? (
              <SmallButton onClick={() => updateReview(props.review.id)}>
                Update
              </SmallButton>
            ) : (
              <></>
            )}

            <Spacer></Spacer>
            <SmallButtonGrey onClick={() => deleteReview(props.review.id)}>
              Delete
            </SmallButtonGrey>
          </ReviewFormButtonBar>
        </ReviewForm>
      ) : (
        <ReviewTileContent>{props.review.content}</ReviewTileContent>
      )}
    </ReviewTile>
  );
};

export default ProfileReviewTile;
