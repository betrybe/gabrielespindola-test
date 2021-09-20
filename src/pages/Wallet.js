import React from 'react';
import { useSelector } from 'react-redux';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';

function Wallet() {
  const errorMessage = useSelector((state) => state.wallet.errorMessage);
  if (errorMessage) return (<div>{errorMessage}</div>);

  return (
    <div className="container">
      <Header />
      <ExpensesTable />
    </div>
  );
}

export default Wallet;
