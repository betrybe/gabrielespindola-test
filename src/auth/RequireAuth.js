import React from 'react';

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

function RequireAuth(props) {
  const isAuthenticated = useSelector((state) => (state.user.isAuthenticated));
  if (!isAuthenticated) {
    return (<Redirect
      to={ {
        pathname: '/',
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

// o linter exige o cumprimento da regra react/prop-types
// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
// sendo assim temos 2 opções, desabilitar a regra( que não é uma opção ) ou adicionar proptypes ao projeto e definir um prop-type para o componente contendo o campo children como obrigatório
// https://forhjy.medium.com/react-solution-for-children-is-missing-in-props-validation-eslint-react-prop-types-2e11bc6043c7
RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
