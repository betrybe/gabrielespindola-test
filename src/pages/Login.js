import React, { useRef } from 'react';
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

import styles from './Login.module.css';

function Login() {
  const email = useRef(null);
  const password = useRef(null);

  const loginHandler = (e) => {
    e.preventDefault();
    console.log('clicou no login');
  };

  const emailValidationError = true;
  const passwordValidationError = false;

  const getClassNameValidationError = (field) => {
    const classNames = ['form-control', 'w-100', styles.regularField];
    let additionalClass = null;
    switch (field) {
    case 'password':
      additionalClass = passwordValidationError ? styles.validationError : null;
      break;

    default:
      additionalClass = emailValidationError ? styles.validationError : null;
    }

    if (additionalClass) classNames.push(additionalClass);

    return classNames.join(' ');
  };

  return (
    <div
      className={ [
        'container',
        'd-flex',
        'flex-column',
        'justify-content-center',
        'align-items-center',
        'p-2',
        styles.loginContainer].join(' ') }
    >
      <h1 className={ styles.title }>Trybe Wallet</h1>
      <form className="form" onSubmit={ loginHandler }>
        <div className="mb-3">
          <input
            type="email"
            className={ getClassNameValidationError('email') }
            id="email"
            aria-describedby="emailHelp"
            placeholder="seuemail@email.com"
            ref={ email }
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className={ getClassNameValidationError('password') }
            id="password"
            placeholder="password"
            ref={ password }
          />
        </div>
        <div className="mb-3">
          <input
            type="submit"
            className={
              ['form-control', 'btn', 'btn-primary', 'regularField', styles.mainBtnColor].join(' ')
            }
            value="Log In"
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
