import React, { useState } from 'react';
import { X } from 'lucide-react';
import styles from './TagInput.module.css';

const TagInput = ({ tags = [], onChange, placeholder = "Enter tag", label }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    };

    const addTag = () => {
        const tag = inputValue.trim();
        if (tag && !tags.includes(tag)) {
            onChange([...tags, tag]);
            setInputValue('');
        }
    };

    const removeTag = (indexToRemove) => {
        onChange(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className={styles.tagInputGroup}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.tagInputContainer}>
                <div className={styles.tagsList}>
                    {tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                            {tag}
                            <button type="button" onClick={() => removeTag(index)} className={styles.removeBtn}>
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={tags.length === 0 ? placeholder : ""}
                        className={styles.input}
                    />
                </div>
            </div>
        </div>
    );
};

export default TagInput;
