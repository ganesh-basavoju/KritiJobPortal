import React, { useState, useRef, useEffect } from 'react';
import styles from './JobFilterBar.module.css';
import JobFilterDropdown from './JobFilterDropdown';

const JobFilterBar = () => {
    // State for Checkbox Filters
    const [selectedTitles, setSelectedTitles] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedExp, setSelectedExp] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [salaryRange, setSalaryRange] = useState([25000, 300000]); // Dual State

    // Active Dropdown State
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Refs for outside click detection
    const barRef = useRef(null);

    // Options Data (Updated from Screenshots)
    const options = {
        titles: ["Designer", "Developer", "Product Manager", "Marketing Specialist", "Data Analyst", "Sales Executive"],
        locations: ["Delhi", "New York", "San Francisco", "London", "Berlin", "Tokyo"],
        experience: ["Entry Level", "Intermediate", "Expert"],
        types: ["Full Time", "Part Time", "Contract", "Freelance", "Internship"]
    };

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const handleSelection = (setter, list, item) => {
        if (list.includes(item)) {
            setter(list.filter(i => i !== item));
        } else {
            setter([...list, item]);
        }
    };

    const handleClickOutside = (event) => {
        if (barRef.current && !barRef.current.contains(event.target)) {
            setActiveDropdown(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Helper to render input content (Pills or Placeholder)
    const renderInputContent = (selected, placeholder) => {
        if (selected.length === 0) return <span className={styles.placeholder}>{placeholder}</span>;
        
        // Show first item + count if more than 1
        return (
            <div className={styles.pillsContainer}>
                <span className={styles.pill}>
                    {selected[0]} <i className="fas fa-times" onClick={(e) => {
                        e.stopPropagation();
                        handleSelection(
                            placeholder.includes("Title") ? setSelectedTitles :
                            placeholder.includes("Location") ? setSelectedLocations :
                            placeholder.includes("Experience") ? setSelectedExp : setSelectedTypes,
                            selected,
                            selected[0]
                        );
                    }}></i>
                </span>
                {selected.length > 1 && (
                    <span className={styles.moreCount}>+{selected.length - 1} more</span>
                )}
            </div>
        );
    };

    const handleSalaryChange = (index, value) => {
        const newRange = [...salaryRange];
        newRange[index] = Number(value);
        // Prevent crossover
        if (index === 0 && newRange[0] > newRange[1]) newRange[0] = newRange[1];
        if (index === 1 && newRange[1] < newRange[0]) newRange[1] = newRange[0];
        setSalaryRange(newRange);
    };

  return (
    <div className={styles.filterBar} ref={barRef}>
      
      {/* 1. Search / Job Title */}
      <div className={styles.filterGroup} onClick={() => toggleDropdown('title')}>
        <i className="fas fa-search"></i>
        <div className={styles.inputArea}>
            {renderInputContent(selectedTitles, "Job Title")}
        </div>
        <i className={`fas fa-chevron-down ${styles.chevron}`}></i>
        <JobFilterDropdown 
            title="Search"
            options={options.titles}
            selected={selectedTitles}
            onChange={(item) => handleSelection(setSelectedTitles, selectedTitles, item)}
            isOpen={activeDropdown === 'title'}
            onClose={() => setActiveDropdown(null)}
        />
      </div>

      <div className={styles.divider}></div>

      {/* 2. Location */}
      <div className={styles.filterGroup} onClick={() => toggleDropdown('location')}>
        <i className="fas fa-map-marker-alt"></i>
        <div className={styles.inputArea}>
            {renderInputContent(selectedLocations, "Location")}
        </div>
        <i className={`fas fa-chevron-down ${styles.chevron}`}></i>
        <JobFilterDropdown 
            title="Location"
            options={options.locations}
            selected={selectedLocations}
            onChange={(item) => handleSelection(setSelectedLocations, selectedLocations, item)}
            isOpen={activeDropdown === 'location'}
            onClose={() => setActiveDropdown(null)}
        />
      </div>

      <div className={styles.divider}></div>

      {/* 3. Experience */}
      <div className={styles.filterGroup} onClick={() => toggleDropdown('experience')}>
        <i className="fas fa-briefcase"></i>
        <div className={styles.inputArea}>
             {renderInputContent(selectedExp, "Experience")}
        </div>
        <i className={`fas fa-chevron-down ${styles.chevron}`}></i>
        <JobFilterDropdown 
            title="Experience"
            options={options.experience}
            selected={selectedExp}
            onChange={(item) => handleSelection(setSelectedExp, selectedExp, item)}
            isOpen={activeDropdown === 'experience'}
            onClose={() => setActiveDropdown(null)}
        />
      </div>

      <div className={styles.divider}></div>

      {/* 4. Job Type */}
      <div className={styles.filterGroup} onClick={() => toggleDropdown('type')}>
        <i className="fas fa-bolt"></i>
        <div className={styles.inputArea}>
            {renderInputContent(selectedTypes, "Job Type")}
        </div>
        <i className={`fas fa-chevron-down ${styles.chevron}`}></i>
        <JobFilterDropdown 
            title="Job Type"
            options={options.types}
            selected={selectedTypes}
            onChange={(item) => handleSelection(setSelectedTypes, selectedTypes, item)}
            isOpen={activeDropdown === 'type'}
            onClose={() => setActiveDropdown(null)}
        />
      </div>

      <div className={styles.divider}></div>

      {/* 5. Salary Slider (Dual) */}
      <div className={styles.salaryGroup}>
        <div className={styles.salaryHeader}>
            <span>Salary</span>
            <span className={styles.salaryValue}>₹{salaryRange[0]} - ₹{salaryRange[1]}</span>
        </div>
        <div className={styles.sliderContainer}>
             <div 
                className={styles.sliderTrack} 
                style={{
                    left: `${((salaryRange[0] - 10000) / (1000000 - 10000)) * 100}%`,
                    width: `${((salaryRange[1] - salaryRange[0]) / (1000000 - 10000)) * 100}%`
                }}
             ></div>
             <input 
                type="range" 
                min="10000" 
                max="1000000" 
                value={salaryRange[0]} 
                onChange={(e) => handleSalaryChange(0, e.target.value)}
                className={styles.sliderInput} 
             />
             <input 
                type="range" 
                min="10000" 
                max="1000000" 
                value={salaryRange[1]} 
                onChange={(e) => handleSalaryChange(1, e.target.value)}
                className={styles.sliderInput} 
             />
        </div>
      </div>
    </div>
  );
};

export default JobFilterBar;
