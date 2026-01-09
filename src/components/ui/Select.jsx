import React from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Select.module.css';

const Select = ({ label, name, value, onChange, options = [], placeholder, required = false, disabled = false }) => {
  return (
    <div className={styles.selectGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.selectWrapper}>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={styles.select}
          required={required}
          disabled={disabled}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option, index) => {
            // Handle both string options and object options { value, label }
            const optionValue = typeof option === 'object' ? option.value : option;
            const optionLabel = typeof option === 'object' ? option.label : option;
            
            return (
              <option key={index} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
        <ChevronDown className={styles.icon} size={16} />
      </div>
    </div>
  );
};

export default Select;
