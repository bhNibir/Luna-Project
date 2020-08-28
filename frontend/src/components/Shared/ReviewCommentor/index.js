import React, { useState } from 'react';
import styled from 'styled-components';
import { SmallButton, SmallButtonGrey } from '../../../style/buttons';

//////////
// STYLE
//////////
const CommentorWrapper = styled.div`
  border-top: 1px solid #ebebeb;
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
`;

const CommentForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const CommentField = styled.input`
  width: 100%;
  margin-right: 20px;
  height: 40px;
  border: 1px solid #ebebeb;
  background-color: white;
  padding: 0 10px;
  border-radius: 3px;
`;

//////////
// REACT
//////////
const ReviewCommentor = (props) => {
  const [comment, setComment] = useState('');

  return (
    <CommentorWrapper>
      <CommentForm
        onSubmit={(e) => {
          e.preventDefault();
          props.fnCreate(props.reviewID, comment);
          props.fnClose();
        }}
      >
        <CommentField
          onChange={(e) => setComment(e.target.value)}
        ></CommentField>
        <SmallButton type="submit">Send</SmallButton>
      </CommentForm>
      <SmallButtonGrey onClick={props.fnClose}>Cancel</SmallButtonGrey>
    </CommentorWrapper>
  );
};

export default ReviewCommentor;
