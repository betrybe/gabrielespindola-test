import React from 'react';

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

function VerifyAuth(props) {
  const isAuthenticated = useSelector((state) => (state.user.isAuthenticated));
  if (isAuthenticated) {
    return (<Redirect
      to={ {
        pathname: '/carteira',
      } }
    />);
  }

  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
}

VerifyAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VerifyAuth;
