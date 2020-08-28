import React from 'react';
import { useSelector } from 'react-redux';
import Axios from '../../../axios';
import styled from 'styled-components';

import { H2 } from '../../../style/titles';
import { SmallButtonGrey } from '../../../style/buttons';

//////////
// STYLES
//////////
const CommentTile = styled.div`
  width: 100%;
  background: white;
  padding: 20px;
  margin-bottom: 30px;
`;

const CommentReview = styled.p`
  color: #e47d31;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CommentText = styled.p`
  color: #4c4c4c;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

//////////
// REACT
//////////
const ProfileComments = (props) => {
  const me = useSelector((state) => state.user);

  const deleteComment = (id) => {
    if (me.token) {
      const url = `comments/${id}/`;
      const auth = 'Bearer ' + me.token;
      const headers = { headers: { Authorization: auth } };

      Axios.delete(url, headers)
        .then((response) => {
          console.log('Comment deleted');
          props.fnReload();
        })
        .catch((error) => {
          console.log('Comment delete error', error.response.data);
        });
    } else {
      console.log('Delete only works if you are logged in');
    }
  };

  return (
    <div>
      <H2>Comments</H2>
      {props.comments.length > 0 ? (
        <>
          {props.comments.map((comment) => (
            <CommentTile key={comment.id}>
              <CommentReview>
                Review nr. {comment.review || 'deleted (oops...)'}
              </CommentReview>
              <CommentText>{comment.content}</CommentText>
              {comment.user.id === me.userData.id ? (
                <ButtonWrapper>
                  <SmallButtonGrey onClick={() => deleteComment(comment.id)}>
                    Delete
                  </SmallButtonGrey>
                </ButtonWrapper>
              ) : (
                <></>
              )}
            </CommentTile>
          ))}
        </>
      ) : (
        'This user has not commented anything yet...'
      )}
    </div>
  );
};

export default ProfileComments;
