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
  if (response.status >= 400) {
    throw new Error(`Code ${response.status}: ${response.statusText}`);
  }
  const contentType = response.headers.get('Content-Type');
  let data;
  if (contentType.includes('application/json')) {
    data = await response.json();
  } else if (contentType.includes('image')) {
    data = await response.blob();
  }
  return data;
}

export {
  makeRequest,
}