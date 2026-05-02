import { useState, useEffect, useRef } from 'react';
import { debounce } from '../../utils/helpers';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = 'Search destinations…', loading = false }) => {
  const [value, setValue] = useState('');
  const debouncedSearch = useRef(debounce(onSearch, 450)).current;

  useEffect(() => {
    debouncedSearch(value);
  }, [value, debouncedSearch]);

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <div className="search-bar__icon">
        {loading ? (
          <div className="search-bar__spinner" />
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        )}
      </div>
      <input
        className="search-bar__input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search destinations"
      />
      {value && (
        <button className="search-bar__clear" onClick={handleClear} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
