import React from 'react';

function PropertyCard({ property }) { 
  let photos = [];
  try {
    photos = property.L_Photos ? JSON.parse(property.L_Photos) : [];
  } 
catch (e) {
    photos = [];
  }


  const firstPhoto = photos.length > 0 ? photos[0] : null;
  
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      margin: '10px',
      width: '280px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
    }}


    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';

      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }}>
      <div style={{ height: '200px', backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
        {firstPhoto ? (
          <img 
            src={firstPhoto} 
            alt={property.L_Address} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#999',
            fontSize: '14px'
          }}>
            No Photo Available
          </div>

        )}
      </div>
      
      <div style={{ padding: '15px' }}>
        <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>
          ${property.L_SystemPrice?.toLocaleString() || 'N/A'}
        </div>
        <div style={{ fontSize: '16px', fontWeight: '500', color: '#444', marginTop: '4px' }}>
          {property.L_Address || 'No address'}
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          {property.L_City}, {property.L_State} {property.L_Zip}
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '10px', fontSize: '14px', color: '#555' }}>
          <span>{property.L_Keyword2 || '?'} beds</span>
          <span>{property.LM_Dec_3 || '?'} baths</span>
          <span>{property.LM_Int2_3?.toLocaleString() || '?'} sqft</span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;