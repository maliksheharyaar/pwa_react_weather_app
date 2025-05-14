import React, { useState, useEffect, useRef } from 'react';
import { fetchCitySuggestions } from '../api/fetchWeather';
import './SearchInput.css';

const SearchInput = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const suggestionsRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length >= 2) {
                try {
                    const results = await fetchCitySuggestions(query);
                    setSuggestions(results);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                const selected = suggestions[selectedIndex];
                onSearch(selected);
                setQuery('');
                setShowSuggestions(false);
                setSuggestions([]);
            } else {
                onSearch(query);
                setQuery('');
                setShowSuggestions(false);
                setSuggestions([]);
            }
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setSelectedIndex(prev => 
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        } else if (event.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        onSearch(suggestion);
        setQuery('');
        setShowSuggestions(false);
        setSuggestions([]);
    };

    return (
        <div className="search-container">
            <input
                ref={inputRef}
                type="text"
                className="search"
                placeholder="Search by city name"
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                    setSelectedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => query.length >= 2 && setShowSuggestions(true)}
            />
            
            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list" ref={suggestionsRef}>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={`${suggestion.name}-${suggestion.country}-${suggestion.lat}-${suggestion.lon}`}
                            className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.name}
                            {suggestion.state && `, ${suggestion.state}`}
                            {` (${suggestion.country})`}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchInput; 