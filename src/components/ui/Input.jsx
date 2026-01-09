import React, { useState } from 'react';
import styles from './Input.module.css';

const Input = ({ label, type, placeholder, value, onChange, name, required = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles.inputGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input 
          className={styles.input}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
        />
        {type === 'password' && (
          <button 
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
