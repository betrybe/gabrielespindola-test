import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../actions';

const tags = [
  'Alimentação',
  'Lazer',
  'Trabalho',
  'Saúde',
];

const pagamentos = [
  'Dinheiro',
  'Cartão de crédito',
  'Cartão de débito',
];

function ExpenseForm() {
  const dispatch = useDispatch();
  const expenseFromState = useSelector((state) => state.wallet.expense);
  const currencies = useSelector((state) => state.wallet.currencies);
  const isFetchingCurrencies = useSelector((state) => state.wallet.isFetchingCurrencies);

  const [expense, setExpense] = useState({ ...expenseFromState });
  const [firstTime, isFirstTime] = useState(true);

  useEffect(() => {
    if (!firstTime) return;
    isFirstTime(false);
    dispatch(Actions.wallet.getAllCurrencies);
    dispatch(Actions.wallet.isFetchingCurrencies(true));
  }, [dispatch, firstTime, isFirstTime]);


  // TODO não reseta quando tenta inserir seguido
  if (expenseFromState.id !== expense.id) {
    setExpense({ ...expenseFromState });
  }

  function saveExpenseHandler(event) {
    event.preventDefault();

    const { value } = event.target.value;
    const currency = event.target.currency.value || null;
    const exchangeRates = currency
      ? currencies[currency] : { ask: 0.0 };
    const convertedValue = (value * exchangeRates.ask).toFixed(2);

    dispatch(Actions.wallet.saveExpense({
      id: event.target.id.value !== '' ? parseInt(event.target.id.value, 10) : null,
      value: event.target.value.value,
      description: event.target.description.value,
      method: event.target.method.value,
      currency,
      tag: event.target.tag.value,
      exchangeRates,
      convertedValue,
    }));

    event.target.value.value = 0.0;
  }

  if (isFetchingCurrencies) return <div>Carregando moedas...</div>;

  return (
    <form className="form" onSubmit={ saveExpenseHandler }>
      <input
        id="expense-id"
        className="form-control"
        name="id"
        type="number"
        value={ expense.id || '' }
        onChange={ (evt) => setExpense({ ...expense, id: evt.target.value }) }
      />
      <label htmlFor="expense-value">
        Valor:
        <input
          id="expense-value"
          className="form-control"
          name="value"
          type="number"
          value={ expense.value }
          onChange={ (evt) => setExpense({ ...expense, value: evt.target.value }) }
          precision={ 2 }
          min="0.00"
          step="0.01"
        />
      </label>
      <label htmlFor="expense-value">
        Descricao:
        <input
          id="expense-description"
          className="form-control"
          name="description"
          value={ expense.description }
          onChange={ (evt) => setExpense({ ...expense, description: evt.target.value }) }
        />
      </label>
      <label htmlFor="expense-value">
        Moeda:
        <select
          id="expense-currency"
          className="form-control"
          name="currency"
          value={ expense.currency }
          onChange={ (evt) => setExpense({ ...expense, currency: evt.target.value }) }
        >
          {Object.values(currencies)
            .map((curr) => <option key={ curr.code }>{curr.code}</option>)}
        </select>
      </label>
      <label htmlFor="expense-value">
        Método de pagamento:
        <select
          id="expense-method"
          className="form-control"
          name="method"
          value={ expense.method }
          onChange={ (evt) => setExpense({ ...expense, method: evt.target.value }) }
        >
          {pagamentos.map((pagamento) => <option key={ pagamento }>{pagamento}</option>)}
        </select>
      </label>
      <label htmlFor="expense-value">
        Tag:
        <select
          id="expense-tag"
          className="form-control"
          name="tag"
          value={ expense.tag }
          onChange={ (evt) => setExpense({ ...expense, tag: evt.target.value }) }
        >
          {tags.map((tag) => <option key={ tag }>{tag}</option>)}
        </select>
      </label>
      <button type="submit" className="btn btn-primary">
        {!expense.id ? 'Adicionar despesa' : 'Editar gasto'}
      </button>

    </form>
  );
}

export default ExpenseForm;
