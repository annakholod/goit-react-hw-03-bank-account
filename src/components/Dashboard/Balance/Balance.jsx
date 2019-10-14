import React from 'react';
import PropTypes from 'prop-types';
import style from './Balance.module.css';

const Balance = ({ changeBalance, changeFinance }) => {
  const deposit = changeFinance('deposit');
  const withdraw = changeFinance('withdraw');
  const balance = changeBalance();
  return (
    <section className={style.balance}>
      <p className={style.deposit}>
        <span>⬆ </span>
        {deposit}$
      </p>
      <p className={style.withdraw}>
        <span>⬇ </span>
        {withdraw}$
      </p>
      <span>Balance: {balance}$</span>
    </section>
  );
};

Balance.propTypes = {
  changeBalance: PropTypes.func.isRequired,
  changeFinance: PropTypes.func.isRequired,
};

export default Balance;
