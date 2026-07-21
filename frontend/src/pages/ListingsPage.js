import React, { useState, useEffect } from 'react';
import { fetchProperties } from '../api/client';
import PropertyCard from '../components/PropertyCard';

function ListingsPage() { 

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProperties({ limit: 20, offset: 0 });
      setProperties(data.results);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }



  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px', color: '#666' }}>
        Loading properties...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        Error: {error}
      </div>
    );
  }



  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '10px' }}>Property Listings</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Showing {properties.length} of {total} properties
      </p>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        gap: '10px'
      }}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}

      </div>
    </div>
  );
}

export default ListingsPage;