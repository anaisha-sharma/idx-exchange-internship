import React, { useState, useEffect } from 'react';

function PropertyFilters({ onSearch, onClear, initialFilters }) {
  const [filters, setFilters] = useState({
    city: '',
    zipcode: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: ''
  });

  // Sync with parent when initialFilters change
  useEffect(() => {
    if (initialFilters) {
      setFilters({
        city: initialFilters.city || '',
        zipcode: initialFilters.zipcode || '',
        minPrice: initialFilters.minPrice || '',
        maxPrice: initialFilters.maxPrice || '',
        beds: initialFilters.beds || '',
        baths: initialFilters.baths || ''
      });
    }
  }, [initialFilters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key].trim()) {
        cleanFilters[key] = filters[key].trim();
      }
    });
    onSearch(cleanFilters);
  };

  const handleClear = () => {
    const emptyFilters = {
      city: '',
      zipcode: '',
      minPrice: '',
      maxPrice: '',
      beds: '',
      baths: ''
    };
    setFilters(emptyFilters);
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '20px',
      alignItems: 'flex-end'
    }}>
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>City</label>
        <input
          type="text"
          name="city"
          value={filters.city}
          onChange={handleChange}
          placeholder="e.g. Beverly Hills"
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', width: '140px' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>Zip</label>
        <input
          type="text"
          name="zipcode"
          value={filters.zipcode}
          onChange={handleChange}
          placeholder="e.g. 90210"
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', width: '100px' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>Min Price</label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="100000"
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', width: '120px' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>Max Price</label>
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="5000000"
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', width: '120px' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>Beds</label>
        <select
          name="beds"
          value={filters.beds}
          onChange={handleChange}
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', width: '80px' }}
        >
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>Baths</label>
        <select
          name="baths"
          value={filters.baths}
          onChange={handleChange}
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', width: '80px' }}
        >
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="submit"
          style={{
            padding: '8px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default PropertyFilters;