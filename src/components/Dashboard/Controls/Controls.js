import React from 'react';
import PropTypes from 'prop-types';
import style from './Controls.module.css';

const Controls = ({ handleChangeInput, handleSubmit, inputValue }) => {
  return (
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
          onClick={handleSubmit}
        >
          Deposit
        </button>
        <button
          className={style.controlsBtn}
          type="button"
          name="withdraw"
          onClick={handleSubmit}
        >
          Withdraw
        </button>
      </div>
    </section>
  );
};

Controls.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default Controls;
