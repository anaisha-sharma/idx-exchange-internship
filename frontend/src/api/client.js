const API_BASE = '/api'; 

export async function fetchProperties(params = {}) {

  const queryParams = new URLSearchParams(); 

  
  Object.keys(params).forEach(key => { 
    if (params[key] && params[key].toString().trim()) { 
      queryParams.append(key, params[key]);
    }
  });
  
  const url = `${API_BASE}/properties?${queryParams.toString()}`;

  const response = await fetch(url);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed: to fetch properties');
  }
  

  return response.json();

}