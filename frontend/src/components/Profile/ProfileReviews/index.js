import React from 'react';

import { H2 } from '../../../style/titles';
import ProfileReviewTile from './ProfileReviewTile';

//////////
// STYLE
//////////

//////////
// REACT
//////////
const ProfileReviews = (props) => {
  return (
    <div>
      <H2>Reviews</H2>
      {props.reviews.length > 0 ? (
        <>
          {props.reviews.map((review) => (
            <ProfileReviewTile
              key={review.id}
              review={review}
              fnReload={props.fnReload}
            ></ProfileReviewTile>
          ))}
        </>
      ) : (
        'This user has not reviewed anything yet.'
      )}
    </div>
  );
};

export default ProfileReviews;
