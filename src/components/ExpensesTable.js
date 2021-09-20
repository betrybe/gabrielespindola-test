import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../actions';

function ExpensesTable() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.wallet.expenses);

  function editElementHandler(id) {
    dispatch(Actions.wallet.selectCurrentExpense(id));
  }

  function removeElementHandler(id) {
    dispatch(Actions.wallet.removeExpense(id));
  }

  function getCurrencyName(name) {
    const aux = name.split('/');
    return aux[0];
  }

  function getCurrencyToName(name) {
    const aux = name.split('/');
    return aux[1];
  }

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Moeda de conversãor</th>
          <th>Editar/excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{expense.value}</td>
            <td>{getCurrencyName(expense.exchangeRates.name)}</td>
            <td>{expense.convertedValue}</td>
            <td>{getCurrencyToName(expense.exchangeRates.name)}</td>
            <td>
              <button
                data-testid="edit-btn"
                type="button"
                onClick={ () => editElementHandler(expense.id) }
              >
                edit
              </button>
              <button
                data-testid="delete-btn"
                type="button"
                onClick={ () => removeElementHandler(expense.id) }
              >
                remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpensesTable;
