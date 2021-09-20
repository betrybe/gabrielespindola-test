import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Header.module.css';

function Header() {
  const user = useSelector((state) => state.user);
  const currency = useSelector((state) => state.wallet.currency);
  const totalExpenses = useSelector((state) => state.wallet.totalExpenses);

  return (
    <header className="d-flex justify-content-between align-items-center">
      <h1 className={ ['flex-grow-1', 'me-1', styles.logo].join(' ') }>Trybe Wallet</h1>
      <span className="me-3">
        <b>Email:</b>
        {' '}
        <span data-testid="email-field">{user.email || 'alguem@email.com'}</span>
      </span>
      <span>
        <b>Despesa Total:</b>
        {' '}
        R$
        <span data-testid="total-field" className="me-1">{totalExpenses || '0.00'}</span>
        <span data-testid="header-currency-field">{currency}</span>
      </span>
    </header>
  );
}

export default Header;
