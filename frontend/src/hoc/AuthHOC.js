import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const protectedComponent = (WrappedComponent) => (props) => {
  const { push } = useHistory();
  const { token } = props.user;

  useEffect(() => {
    if (!token) {
      push(`/login`);
    }
  }, [token, push]);

  return <WrappedComponent />;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const composedComponent = compose(connect(mapStateToProps), protectedComponent);

export default composedComponent;
