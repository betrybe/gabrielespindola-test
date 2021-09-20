import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const user = useSelector((state) => state.user);
  const currency = useSelector((state) => state.wallet.currency);
  const totalExpenses = useSelector((state) => state.wallet.totalExpenses);

  return (
    <header>
      <h1>Trybe Wallet</h1>
      <span data-testid="email-field">{user.email}</span>
      <span data-testid="header-currency-field">{currency}</span>
      <span data-testid="total-field">{totalExpenses}</span>
    </header>
  );
}

export default Header;
