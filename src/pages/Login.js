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

import React, { useRef } from 'react';
import styles from './Login.module.css';

function Login() {
  const email = useRef(null);
  const password = useRef(null);

  const classNames = [formControl, 'w-100', styles.regularField];
  const startClassNames = classNames.join(' ');
  const formElementClassNames = ['formControl', 'btn', 'btn-primary', 'regularField'];

  function loginHandler(e) {
    e.preventDefault();

    if (!email.current.value) {
      email.current.className = `${email.current.className} ${styles.validationError}`;
    } else email.current.className = startClassNames;
  }

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
            className={ startClassNames }
            id="email"
            aria-describedby="emailHelp"
            placeholder="seuemail@email.com"
            ref={ email }
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className={ startClassNames }
            id="password"
            placeholder="password"
            ref={ password }
          />
        </div>
        <div className="mb-3">

          <input
            type="button"
            className={
              [
                ...formElementClassNames,
                styles.mainBtnColor].join(' ')
            }
            value="Log In"
            onClick={ loginHandler }
          />

          <input
            type="submit"
            className={
              [
                ...formElementClassNames,
                styles.mainBtnColor].join(' ')
            }
            value="Log In"
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
