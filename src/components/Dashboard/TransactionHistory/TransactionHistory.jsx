import React from 'react';
import PropTypes from 'prop-types';
import style from './TransactionHistory.module.css';

const TransactionHistory = ({ transactions }) => (
  <table className={style.history}>
    <thead className={style.tableHeader}>
      <tr className={style.tableRow}>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(el => (
        <tr className={style.tableRow} key={el.id}>
          <td>{el.type}</td>
          <td>{el.amount}$</td>
          <td>{el.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TransactionHistory;
