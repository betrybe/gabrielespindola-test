/**
 * tendo em vista que estamos usando a versão "16.13.1" do react, migrei os componentes para utilização funcional utilizando Hooks
 * Documentação dos hooks: https://pt-br.reactjs.org/docs/hooks-intro.html
 * Motivação para a criação de hooks: https://pt-br.reactjs.org/docs/hooks-intro.html#motivation
 * Principais pontos:
 *  1: Componentes Complexos se Tornam Difíceis de Entender
 *  2: Classes Confundem tanto Pessoas quanto Máquinas
 *
 * Conclusão:
 * Para resolver esses problemas, Hooks permitem você usar mais das funcionalidades de React sem classes.
 * Conceitualmente, componentes React sempre estiveram mais próximos de funções. Hooks adotam funções, mas sem sacrificar o espírito prático de React.
 * Hooks provêem acesso a válvulas de escape imperativas e não requerem você a aprender técnicas complexas de programação funcional ou reativa.
 */

import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import styles from './Login.module.css';
import Actions from '../actions';

function validateEmailFormat(aux) {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(aux);
}

function hasEmailError(emailString) {
  return !emailString || !validateEmailFormat(emailString);
}

function hasPasswordError(passwordString) {
  const MIN_PASSWORD = 6;
  return !passwordString || passwordString.length < MIN_PASSWORD;
}

function Login() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => (state.user.isAuthenticated));

  // utilizando o hook useRef para conseguir uma referencia do Elemento Dom
  // https://pt-br.reactjs.org/docs/refs-and-the-dom.html
  const email = useRef(null);
  const password = useRef(null);

  // utilizando o useState para gerenciar o estado do componente utilizando hooks
  // https://pt-br.reactjs.org/docs/hooks-state.html
  const [emailValidationError, setEmailValidationError] = useState(true);
  const [passwordValidationError, setPasswordValidationError] = useState(true);

  const classNames = ['form-control', 'w-100', styles.regularField];
  const emailClassNames = [...classNames];
  const passwordClassNames = [...classNames];

  if (emailValidationError) emailClassNames.push(styles.validationError);
  if (passwordValidationError) passwordClassNames.push(styles.validationError);

  function validateEmailHandler() {
    const emailError = hasEmailError(email.current.value);
    setEmailValidationError(emailError);
    if (!emailError) return null;
    return email.current;
  }

  function validatePasswordHandler() {
    const passwordError = hasPasswordError(password.current.value);
    setPasswordValidationError(passwordError);
    if (!passwordError) return null;
    return password.current;
  }

  function loginHandler(event) {
    event.preventDefault();
    const hasErrors = [];
    const emailError = validateEmailHandler();
    if (emailError) hasErrors.push(emailError);

    const passwordError = validatePasswordHandler();
    if (passwordError) hasErrors.push(password.current);

    if (hasErrors.length > 0) {
      hasErrors[0].focus();
      return;
    }

    setEmailValidationError(false);
    setPasswordValidationError(false);

    // utilizando um action creator para algo simples... como não existe transformação poderia ter dado dispatch diretamente a action
    // com um action creator temos a possibilidade de tratar side effects
    // https://medium.com/magnetis-backstage/redux-side-effects-and-me-89c104a4b149
    // isso é permitido por causa do redux-thunk
    // https://github.com/reduxjs/redux-thunk
    dispatch(
      Actions.user.login(
        { email: email.current.value, password: password.current.value },
      ),
    );
  }

  if (isAuthenticated) {
    return (<Redirect
      to={ {
        pathname: '/carteira',
      } }
    />);
  }

  return (
    <div
      className={ [
        'container',
        'd-flex',
        'flex-column',
        'justify-content-center',
        'align-items-center',
        styles.loginContainer].join(' ') }
    >
      <h1 className={ styles.title }>
        Trybe Wallet
      </h1>
      <form className="form" onSubmit={ loginHandler }>
        <div className="mb-3">
          <input
            type="email"
            className={ emailClassNames.join(' ') }
            placeholder="alguem@email.com"
            data-testid="email-input"
            ref={ email }
            onKeyUp={ validateEmailHandler }
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className={ passwordClassNames.join(' ') }
            placeholder="password"
            data-testid="password-input"
            ref={ password }
            onKeyUp={ validatePasswordHandler }
          />
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className={
              [
                ...classNames,
                'btn',
                'btn-primary',
                styles.mainBtnColor].join(' ')
            }
            onClick={ loginHandler }
            disabled={ emailValidationError || passwordValidationError }
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
