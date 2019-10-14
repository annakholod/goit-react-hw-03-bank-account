import React from 'react';
import PropTypes from 'prop-types';
import style from './Controls.module.css';

const Controls = ({ handleChangeInput, onClick, inputValue }) => (
  <section className={style.controls}>
    <div className={style.controlsOverlay}>
      <input
        className={style.controlsInput}
        type="number"
        value={inputValue}
        onChange={handleChangeInput}
      />
      <button
        className={style.controlsBtn}
        type="button"
        name="deposit"
        onClick={onClick}
      >
        Deposit
      </button>
      <button
        className={style.controlsBtn}
        type="button"
        name="withdraw"
        onClick={onClick}
      >
        Withdraw
      </button>
    </div>
  </section>
);

Controls.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default Controls;
