import React from 'react';
import PropTypes from 'prop-types';
import style from './Balance.module.css';

const Balance = ({ balance, deposit, withdraw }) => {
  const balanceFormat = balance.toLocaleString('ru-RU');
  const depositFormat = deposit.toLocaleString('ru-RU');
  const withdrawFormat = withdraw.toLocaleString('ru-RU');
  return (
    <section className={style.balance}>
      {deposit ? (
        <p className={style.deposit}>
          <span>⬆ </span>
          {depositFormat}$
        </p>
      ) : null}
      {withdraw ? (
        <p className={style.withdraw}>
          <span>⬇ </span>
          {withdrawFormat}$
        </p>
      ) : null}
      <span>Balance: {balanceFormat}$</span>
    </section>
  );
};

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  deposit: PropTypes.number.isRequired,
  withdraw: PropTypes.number.isRequired,
};

export default Balance;
