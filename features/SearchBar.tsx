"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

import "@/styles/features/searchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Искать пользователей...' }: SearchBarProps) {
  const { localValue, handleChange, handleClear } = useSearchUsers(value, onChange);

  function useSearchUsers(value: string, onChange: (value: string) => void) {
    const [localValue, setLocalValue] = useState(value);
    
    const debounceRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      setLocalValue(newValue);
      
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      debounceRef.current = setTimeout(() => {
        onChange(newValue);
      }, 300);
    }, [onChange]);

    const handleClear = useCallback(() => {
      setLocalValue('');
      onChange('');
    }, [onChange]);

    return { localValue, handleChange, handleClear };
  }

  return (
    <div className="search-bar">
      <svg className="search-bar__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`search-bar__input ${localValue.length > 0 ? "search-bar__input--has-value" : ""}`}
      />

      {localValue && (
        <button onClick={handleClear} className="search-bar__clear-button">
          <svg className="search-bar__clear-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}