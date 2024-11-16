const baseUrl = 'http://localhost:4000';

async function makeRequest({ url, method, query, body }) {
  const fullUrl = new URL(url, baseUrl)
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      fullUrl.searchParams.set(key, value);
    })
  }
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null, 
    mode: 'cors',
  }
  const response = await fetch(fullUrl, options);  
  const data = await response.json();
  return data;
}

export {
  makeRequest,
}