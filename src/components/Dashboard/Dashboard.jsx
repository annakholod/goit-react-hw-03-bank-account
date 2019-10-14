import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer } from 'react-toastify';
import style from './Dashboard.module.css';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import {
  notifyNoMoney,
  notifyNotSum,
  notifyIncorrectInput,
} from '../../helpers/helpers';

class Dashboard extends Component {
  state = {
    transactions: [],
    inputValue: '',
  };

  componentDidMount() {
    try {
      const transactionsFromLocal = localStorage.getItem('transactions');
      return transactionsFromLocal === null
        ? undefined
        : this.setState({ transactions: JSON.parse(transactionsFromLocal) });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions } = this.state;

    if (prevState.transactions !== transactions) {
      try {
        localStorage.setItem('transactions', JSON.stringify(transactions));
      } catch (err) {
        console.log(err);
      }
    }
  }

  handleChangeInput = ({ target }) => {
    const { value } = target;
    if (value.includes('-')) {
      notifyIncorrectInput();
      return;
    }
    this.setState({ inputValue: value });
  };

  handleSubmit = evt => {
    const { inputValue } = this.state;
    const { name } = evt.target;

    evt.preventDefault();
    if (inputValue === '0') {
      notifyNotSum();
      return;
    }
    if (name === 'withdraw' && Number(inputValue) > this.changeBalance()) {
      notifyNoMoney();
      return;
    }
    this.addTransactionToState(name, inputValue);
  };

  addTransactionToState = (name, inputValue) => {
    this.setState(prevState => ({
      inputValue: '',
      transactions: [
        ...prevState.transactions,
        {
          id: shortid.generate(),
          type: name,
          amount: inputValue,
          date: new Date().toLocaleString('en-GB'),
        },
      ],
    }));
  };

  changeFinance = type => {
    const { transactions } = this.state;

    return transactions.reduce(
      (acc, el) => (el.type === type ? acc + Number(el.amount) : acc),
      0,
    );
  };

  changeBalance = () => {
    const { transactions } = this.state;

    let balance = 0;
    if (transactions.length !== 0) {
      balance = this.changeFinance('deposit') - this.changeFinance('withdraw');
    }
    return balance;
  };

  render() {
    const { transactions, inputValue } = this.state;

    return (
      <div className={style.dashboard}>
        <Controls
          inputValue={inputValue}
          handleChangeInput={this.handleChangeInput}
          onClick={this.handleSubmit}
        />
        <Balance
          changeBalance={this.changeBalance}
          changeFinance={this.changeFinance}
        />
        <TransactionHistory transactions={transactions} />
        <ToastContainer />
      </div>
    );
  }
}

export default Dashboard;
