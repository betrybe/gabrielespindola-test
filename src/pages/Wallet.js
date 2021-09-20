import React from 'react';
import { useSelector } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';

function Wallet() {
  const errorMessage = useSelector((state) => state.wallet.errorMessage);
  if (errorMessage) return (<div>{errorMessage}</div>);

  return (
    <div className="w-100">
      <Header />
      <ExpenseForm />
      <ExpensesTable />
    </div>
  );
}

export default Wallet;
