const baseUrl = 'http://localhost:3000/api';

async function makeRequest({ method, query, body }) {
  const url = new URL('/api', baseUrl)
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    })
  }
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null, 
  }
  const response = await fetch(url, options);  
  const data = await response.json();
  return data;
}

export default {
  makeRequest
}