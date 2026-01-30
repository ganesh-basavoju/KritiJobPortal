import React, { useState, useRef, useEffect } from 'react';
import styles from './JobFilterBar.module.css';
import JobFilterDropdown from './JobFilterDropdown';

const JobFilterBar = ({ filters, onFilterChange }) => {
    // Local state for UI responsiveness, synced with props
    const [localFilters, setLocalFilters] = useState(filters || {
        keyword: '',
        location: [],
        experienceLevel: [],
        type: [],
        minSalary: 0,
        maxSalary: 5000000 // 50 LPA default
    });

    // Sync props to local state when URL changes (external change)
    useEffect(() => {
        if (filters) {
            setLocalFilters(prev => ({
                ...prev,
                ...filters,
                // Ensure arrays
                location: Array.isArray(filters.location) ? filters.location : filters.location ? [filters.location] : [],
                experienceLevel: Array.isArray(filters.experienceLevel) ? filters.experienceLevel : filters.experienceLevel ? [filters.experienceLevel] : [],
                type: Array.isArray(filters.type) ? filters.type : filters.type ? [filters.type] : [],
                // Ensure defaults if missing in filters
                minSalary: filters.minSalary !== undefined ? filters.minSalary : 0,
                maxSalary: filters.maxSalary !== undefined ? filters.maxSalary : 5000000
            }));
        }
    }, [filters]);

    // Active Dropdown State
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Refs for outside click detection
    const barRef = useRef(null);

    // Options Data
    const options = {
        titles: ["Designer", "Developer", "Product Manager", "Marketing Specialist", "Data Analyst", "Sales Executive"],
        locations: ["Delhi", "New York", "San Francisco", "London", "Berlin", "Tokyo"],
        experience: ["Entry Level", "Intermediate", "Expert"],
        types: ["Full-Time", "Part-Time", "Contract", "Freelance", "Internship"]
    };

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const notifyChange = (newFilters) => {
        if (onFilterChange) {
            onFilterChange(newFilters);
        }
    };

    const handleSelection = (field, item) => {
        let newList;
        if (localFilters[field].includes(item)) {
            newList = localFilters[field].filter(i => i !== item);
        } else {
            newList = [...localFilters[field], item];
        }
        
        const newFilters = { ...localFilters, [field]: newList };
        setLocalFilters(newFilters);
        notifyChange(newFilters);
    };
    
    // Special handler for Title/Keyword which is single select in UI but acts as search
    const handleTitleSelection = (item) => {
        // Toggle behavior for title tags
        const currentKeywords = localFilters.keyword ? localFilters.keyword.split(',') : [];
        let newKeywords;
        if (currentKeywords.includes(item)) {
            newKeywords = currentKeywords.filter(k => k !== item);
        } else {
            newKeywords = [...currentKeywords, item];
        }
        
        const newFilters = { ...localFilters, keyword: newKeywords.join(',') };
        setLocalFilters(newFilters);
        notifyChange(newFilters);
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
        if (!selected || selected.length === 0) return <span className={styles.placeholder}>{placeholder}</span>;
        
        // Show first item + count if more than 1
        return (
            <div className={styles.pillsContainer}>
                <span className={styles.pill}>
                    {selected[0]} <i className="fas fa-times" onClick={(e) => {
                        e.stopPropagation();
                        // Determine field based on placeholder
                        const field = placeholder === "Experience" ? "experienceLevel" : 
                                      placeholder === "Job Type" ? "type" : 
                                      placeholder === "Location" ? "location" : "keyword";
                                      
                        if (field === "keyword") {
                             handleTitleSelection(selected[0]);
                        } else {
                             handleSelection(field, selected[0]);
                        }
                    }}></i>
                </span>
                {selected.length > 1 && (
                    <span className={styles.moreCount}>+{selected.length - 1} more</span>
                )}
            </div>
        );
    };
    
    // Debounce salary updates
    useEffect(() => {
        const timer = setTimeout(() => {
            if (filters && (localFilters.minSalary !== filters.minSalary || localFilters.maxSalary !== filters.maxSalary)) {
                 notifyChange(localFilters);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [localFilters.minSalary, localFilters.maxSalary]);

    const handleSalaryChange = (index, value) => {
        const val = Number(value);
        let newMin = localFilters.minSalary;
        let newMax = localFilters.maxSalary;
        
        if (index === 0) newMin = val;
        else newMax = val;
        
        // Prevent crossover
        if (newMin > newMax) {
            if (index === 0) newMin = newMax;
            else newMax = newMin;
        }
        
        setLocalFilters(prev => ({ ...prev, minSalary: newMin, maxSalary: newMax }));
    };

  return (
    <div className={styles.filterBar} ref={barRef}>
      
      {/* 1. Search / Job Title */}
      <div className={styles.filterGroup} onClick={() => toggleDropdown('title')}>
        <i className="fas fa-search"></i>
        <div className={styles.inputArea}>
            {renderInputContent(localFilters.keyword ? localFilters.keyword.split(',').filter(Boolean) : [], "Job Title")}
        </div>
        <i className={`fas fa-chevron-down ${styles.chevron}`}></i>
        <JobFilterDropdown 
            title="Search"
            options={options.titles}
            selected={localFilters.keyword ? localFilters.keyword.split(',') : []}
            onChange={(item) => handleTitleSelection(item)}
            isOpen={activeDropdown === 'title'}
            onClose={() => setActiveDropdown(null)}
        />
      </div>

      <div className={styles.divider}></div>

      {/* 2. Location */}
      <div className={styles.filterGroup} onClick={() => toggleDropdown('location')}>
        <i className="fas fa-map-marker-alt"></i>
        <div className={styles.inputArea}>
            {renderInputContent(localFilters.location, "Location")}
        </div>
        <i className={`fas fa-chevron-down ${styles.chevron}`}></i>
        <JobFilterDropdown 
            title="Location"
            options={options.locations}
            selected={localFilters.location || []}
            onChange={(item) => handleSelection('location', item)}
            isOpen={activeDropdown === 'location'}
            onClose={() => setActiveDropdown(null)}
        />
      </div>

      <div className={styles.divider}></div>

      {/* 3. Experience */}
      <div className={styles.filterGroup} onClick={() => toggleDropdown('experience')}>
        <i className="fas fa-briefcase"></i>
        <div className={styles.inputArea}>
             {renderInputContent(localFilters.experienceLevel, "Experience")}
        </div>
        <i className={`fas fa-chevron-down ${styles.chevron}`}></i>
        <JobFilterDropdown 
            title="Experience"
            options={options.experience}
            selected={localFilters.experienceLevel || []}
            onChange={(item) => handleSelection('experienceLevel', item)}
            isOpen={activeDropdown === 'experience'}
            onClose={() => setActiveDropdown(null)}
        />
      </div>

      <div className={styles.divider}></div>

      {/* 4. Job Type */}
      <div className={styles.filterGroup} onClick={() => toggleDropdown('type')}>
        <i className="fas fa-bolt"></i>
        <div className={styles.inputArea}>
            {renderInputContent(localFilters.type, "Job Type")}
        </div>
        <i className={`fas fa-chevron-down ${styles.chevron}`}></i>
        <JobFilterDropdown 
            title="Job Type"
            options={options.types}
            selected={localFilters.type || []}
            onChange={(item) => handleSelection('type', item)}
            isOpen={activeDropdown === 'type'}
            onClose={() => setActiveDropdown(null)}
        />
      </div>

      <div className={styles.divider}></div>

      {/* 5. Salary Slider (Dual) */}
      <div className={styles.salaryGroup}>
        <div className={styles.salaryHeader}>
            <span>Salary</span>
            <span className={styles.salaryValue}>₹{localFilters.minSalary} - ₹{localFilters.maxSalary}</span>
        </div>
        <div className={styles.sliderContainer}>
             <div 
                className={styles.sliderTrack} 
                style={{
                    left: `${((localFilters.minSalary - 0) / (5000000 - 0)) * 100}%`,
                    width: `${((localFilters.maxSalary - localFilters.minSalary) / (5000000 - 0)) * 100}%`
                }}
             ></div>
             <input 
                type="range" 
                min="0" 
                max="5000000" 
                step="10000"
                value={localFilters.minSalary} 
                onChange={(e) => handleSalaryChange(0, e.target.value)}
                className={styles.sliderInput} 
             />
             <input 
                type="range" 
                min="0" 
                max="5000000" 
                step="10000"
                value={localFilters.maxSalary} 
                onChange={(e) => handleSalaryChange(1, e.target.value)}
                className={styles.sliderInput} 
             />
        </div>
      </div>
    </div>
  );
};

export default JobFilterBar;
