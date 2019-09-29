import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './Dashboard.module.css';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
    inputValue: '',
    deposit: 0,
    withdraw: 0,
  };

  componentDidMount() {
    try {
      let transactionsFromLocal = localStorage.getItem('transactions');
      transactionsFromLocal =
        transactionsFromLocal === null ? [] : JSON.parse(transactionsFromLocal);
      let balanceFromLocal = localStorage.getItem('balance');
      balanceFromLocal =
        balanceFromLocal === null ? 0 : JSON.parse(balanceFromLocal);
      this.setState(
        {
          transactions: transactionsFromLocal,
          balance: balanceFromLocal,
        },
        this.changeBalance,
      );
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance } = this.state;

    if (prevState !== this.state) {
      try {
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('balance', JSON.stringify(balance));
      } catch (err) {
        console.log(err);
      }
    }
  }

  handleChangeInput = ({ target }) => {
    this.setState({ inputValue: target.value });
  };

  handleSubmit = evt => {
    const { balance, inputValue } = this.state;
    const { name } = evt.target;

    evt.preventDefault();
    let newBalance = 0;
    if (Number(inputValue) === 0) {
      this.notifyNotSum();
    } else if (name === 'deposit') {
      newBalance = balance + Number(inputValue);
      this.handleSubmitSetState(newBalance, name, inputValue);
    } else if (name === 'withdraw') {
      if (Number(inputValue) > balance) {
        this.notifyNoMoney();
      } else {
        newBalance = balance - Number(inputValue);
        this.handleSubmitSetState(newBalance, name, inputValue);
      }
    }
  };

  notifyNoMoney = () =>
    toast('На счету недостаточно средств для проведения операции!');

  notifyNotSum = () => toast('Введите сумму для проведения операции!');

  handleSubmitSetState = (newBalance, name, inputValue) => {
    this.setState(
      prevState => ({
        balance: newBalance,
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
      }),
      this.changeBalance,
    );
  };

  changeBalance = () => {
    const { transactions } = this.state;

    const depositSum = transactions.reduce((acc, el) => {
      return el.type === 'deposit' ? acc + Number(el.amount) : acc;
    }, 0);
    const withdrawSum = transactions.reduce((acc, el) => {
      return el.type === 'withdraw' ? acc + Number(el.amount) : acc;
    }, 0);
    this.setState({
      deposit: depositSum,
      withdraw: withdrawSum,
    });
  };

  render() {
    const { transactions, balance, inputValue, deposit, withdraw } = this.state;

    return (
      <div className={style.dashboard}>
        <Controls
          inputValue={inputValue}
          handleChangeInput={this.handleChangeInput}
          handleSubmit={this.handleSubmit}
        />
        <Balance balance={balance} deposit={deposit} withdraw={withdraw} />
        <TransactionHistory transactions={transactions} />
        <ToastContainer />
      </div>
    );
  }
}

export default Dashboard;
