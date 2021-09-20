import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react/cjs/react.development';
import Actions from '../actions';
import ExpenseForm from './ExpenseForm';

const defaultProps = {
  id: null,
  value: 0.0,
  currency: 'USD',
  description: '',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

function ExpensesTable() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.wallet.expenses);
  const currencyToExchange = useSelector((state) => state.wallet.currencyToExchange);
  const [expense, setExpense] = useState(null);
  const [localExpanses, setLocalExpanses] = useState([]);

  useEffect(() => {
    setExpense(defaultProps);
    setLocalExpanses(expenses);
  }, [setExpense, expenses, localExpanses, setLocalExpanses]);

  function editElementHandler(expenseSelected) {
    setExpense({ ...expenseSelected });
  }

  function removeElementHandler(id) {
    dispatch(Actions.wallet.removeExpense(id));
  }

  function isSavedHandler(isSaved = true) {
    if (!isSaved) return;
    setExpense(defaultProps);
  }

  function getRateName(expenseItem) {
    const selectedRates = expenseItem.exchangeRates[expenseItem.currency];
    if (!selectedRates) return '';
    return selectedRates.name;
  }

  function getRate(expenseItem) {
    const selectedRates = expenseItem.exchangeRates[expenseItem.currency];
    if (!selectedRates) return '0.00';
    return parseFloat(selectedRates.ask).toFixed(2);
  }

  function getNewValue(expenseItem) {
    const selectedRates = expenseItem.exchangeRates[expenseItem.currency];
    if (!selectedRates) return '0.00';
    return (expenseItem.value * parseFloat(selectedRates.ask)).toFixed(2);
  }

  return (
    <section>
      {expense && <ExpenseForm
        id={ expense.id }
        value={ parseFloat(expense.value) }
        currency={ expense.currency }
        description={ expense.description }
        tag={ expense.tag }
        method={ expense.method }
        isSavedHandler={ isSavedHandler }
      />}

      <table className="table table-striped py-3 w-100">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expenseItem) => (
            <tr key={ expenseItem.id }>
              <td>{expenseItem.description}</td>
              <td>{expenseItem.tag}</td>
              <td>{expenseItem.method}</td>
              <td>{expenseItem.value}</td>
              <td>{getRateName(expenseItem)}</td>
              <td>{getRate(expenseItem)}</td>
              <td>{getNewValue(expenseItem)}</td>
              <td>Real</td>
              <td className="d-flex">
                <button
                  data-testid="edit-btn"
                  type="button"
                  className="me-1 btn btn-warning text-secondary"
                  onClick={ () => editElementHandler(expenseItem) }
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  className="btn btn-danger text-white"
                  onClick={ () => removeElementHandler(expenseItem.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ExpensesTable;
