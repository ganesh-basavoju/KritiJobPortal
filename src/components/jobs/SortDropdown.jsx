import React, { useState, useRef, useEffect } from 'react';
import styles from './SortDropdown.module.css';

const SortDropdown = ({ onSort }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Relevance');
    const dropdownRef = useRef(null);

    const options = [
        "Relevance",
        "Most Recent",
        "Salary (Low to High)",
        "Salary (High to Low)"
    ];

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
        if (onSort) onSort(option);
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button 
                className={`${styles.trigger} ${isOpen ? styles.active : ''}`} 
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected} <i className="fas fa-sliders-h" style={{ marginLeft: '10px', fontSize: '0.9rem' }}></i>
            </button>
            
            {isOpen && (
                <div className={styles.dropdown}>
                    {options.map((option) => (
                        <div 
                            key={option} 
                            className={`${styles.option} ${selected === option ? styles.selectedOption : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;
