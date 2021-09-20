import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Actions from '../actions';

import styles from './ExpenseForm.module.css';

const tags = [
  'Alimentação',
  'Lazer',
  'Trabalho',
  'Transporte',
  'Saúde',
];

const pagamentos = [
  'Dinheiro',
  'Cartão de crédito',
  'Cartão de débito',
];

const defaultProps = {
  id: null,
  value: 0.0,
  currency: 'USD',
  description: '',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

function getRatesAndConvertedValue(elementValue, elementCurrency, currencies) {
  const expanseValue = elementValue.value || 0;
  const currencyValue = elementCurrency.value || null;
  const exchangeRates = currencyValue
    ? currencies[currencyValue] : { ask: 0.0 };
  const convertedValue = (expanseValue * exchangeRates.ask).toFixed(2);

  return { selectedRates: exchangeRates, convertedValue };
}

function ExpenseForm({ id, value, currency, description, tag, method, isSavedHandler }) {
  const dispatch = useDispatch();
  const [firstTime, isFirstTime] = useState(true);
  const currencies = useSelector((state) => state.wallet.currencies);
  const isFetchingCurrencies = useSelector((state) => state.wallet.isFetchingCurrencies);
  const expenses = useSelector((state) => state.wallet.expenses);
  const [formCurrencies, setFormCurrencies] = useState();

  const elementId = useRef();
  const elementValue = useRef();
  const elementDescription = useRef();
  const elementCurrency = useRef();
  const elementTag = useRef();
  const elementMethod = useRef();
  const [expense, setExpense] = useState(defaultProps);

  const currencyForOptions = formCurrencies
    ? Object.values(formCurrencies).map((item) => (item.code)) : ['USD'];

  // resgatando os dados enviados via props para o state
  useEffect(() => {
    setExpense({ id, value, currency, description, tag, method });
    isFirstTime(!id);
  }, [id, value, currency, description, tag, method, isFirstTime]);

  // tratando a busca pelos conversores somente for uma inclusão
  useEffect(() => {
    if (!firstTime) return;

    isFirstTime(false);
    dispatch(Actions.wallet.isFetchingCurrencies(true));
    dispatch(Actions.wallet.getAllCurrencies);
  }, [dispatch, firstTime, isFirstTime]);

  // tratando a busca pelos conversores
  useEffect(() => {
    if (!id) {
      setFormCurrencies(currencies);
      return;
    }

    const currentExpense = expenses.find((item) => item.id === id);
    setFormCurrencies(currentExpense.exchangeRates);
  }, [dispatch, isFirstTime, setFormCurrencies, firstTime, id, expenses, currencies]);

  function setValue(variable, objectValue) {
    const newExpense = { ...expense };
    newExpense[variable] = objectValue;
    setExpense(newExpense);
  }

  function saveExpenseHandler(event) {
    event.preventDefault();

    const { selectedRates, convertedValue } = getRatesAndConvertedValue(
      elementValue.current,
      elementCurrency.current,
      currencies,
    );

    dispatch(Actions.wallet.saveExpense({
      id: elementId.current.value !== '' ? parseInt(elementId.current.value, 10) : null,
      value: elementValue.current.value !== ''
        ? parseFloat(elementValue.current.value).toFixed(2) : 0.00,
      description: elementDescription.current.value,
      method: elementMethod.current.value,
      currency: elementCurrency.current.value || null,
      tag: elementTag.current.value,
      exchangeRates: currencies,
      selectedRates,
      convertedValue,
    }));

    setExpense({ ...defaultProps });
    isFirstTime(true);
    isSavedHandler(true);
  }

  return (
    <form
      className={
        [
          'form',
          'w-100',
          'd-flex',
          'justify-content-between',
          'p-3',
          styles.formLayout,
        ].join(' ')
      }
      onSubmit={ saveExpenseHandler }
    >
      <input
        id="expense-id"
        className="form-control"
        name="id"
        type="hidden"
        data-testid="id-input"
        value={ expense.id || '' }
        onChange={ (evt) => setValue('id', evt.target.value) }
        ref={ elementId }
      />
      <label htmlFor="expense-value">
        Valor:
        <input
          id="expense-value"
          className="form-control"
          name="value"
          type="number"
          data-testid="value-input"
          value={ expense.value }
          onChange={ (evt) => setValue('value', parseFloat(evt.target.value)) }
          precision={ 2 }
          min="0.00"
          step="0.01"
          ref={ elementValue }
        />
      </label>
      <label htmlFor="expense-description" className="flex-grow-1">
        Descrição:
        <input
          id="expense-description"
          className="form-control"
          name="description"
          data-testid="description-input"
          value={ expense.description }
          onChange={ (evt) => setValue('description', evt.target.value) }
          ref={ elementDescription }
        />
      </label>
      <label htmlFor="expense-currency">
        Moeda:
        {isFetchingCurrencies && <div>...</div>}
        <select
          id="expense-currency"
          className="form-control"
          name="currency"
          data-testid="currency-input"
          value={ expense.currency }
          onChange={ (evt) => setValue('currency', evt.target.value) }
          ref={ elementCurrency }
        >
          {currencyForOptions
            .map((curr) => (<option key={ curr }>{curr}</option>))}
        </select>

      </label>
      <label htmlFor="expense-method">
        Método de pagamento:
        <select
          id="expense-method"
          className="form-control"
          name="method"
          data-testid="method-input"
          value={ expense.method }
          onChange={ (evt) => setValue('method', evt.target.value) }
          ref={ elementMethod }
        >
          {pagamentos.map((pagamento) => <option key={ pagamento }>{pagamento}</option>)}
        </select>
      </label>
      <label htmlFor="expense-tag">
        Tag:
        <select
          id="expense-tag"
          className="form-control"
          name="tag"
          data-testid="tag-input"
          value={ expense.tag }
          onChange={ (evt) => setValue('tag', evt.target.value) }
          ref={ elementTag }
        >
          {tags.map((tagAux) => <option key={ tagAux }>{tagAux}</option>)}
        </select>
      </label>
      { !expense.id
        && <button type="submit" className="btn btn-primary">Adicionar despesa</button> }

      { expense.id
        && <button type="submit" className="btn btn-primary">Editar despesa</button> }

    </form>
  );
}

ExpenseForm.propTypes = {
  id: PropTypes.number,
  value: PropTypes.number,
  currency: PropTypes.string,
  description: PropTypes.string,
  method: PropTypes.string,
  tag: PropTypes.string,
  isSavedHandler: PropTypes.func.isRequired,
};

ExpenseForm.defaultProps = defaultProps;

export default ExpenseForm;
