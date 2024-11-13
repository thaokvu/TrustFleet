const baseUrl = 'http://localhost:3000/api';

async function makeRequest(method, query, body) {
  const request = new Request(baseUrl,{
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : '',
  })
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      request.searchParams.set(key, value);
    })
  }
  const response = await fetch(request);  
  const data = await response.json();
  return data;
}