const API_BASE_URL = 'https://demohotelsapi.pythonanywhere.com';

async function request(endpoint, signal) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();

  if (payload.status && payload.status >= 400) {
    throw new Error(payload.message || 'The hotels API returned an error.');
  }

  return payload.data;
}

export function fetchHotels(signal) {
  return request('/hotels/', signal);
}

export function fetchHotelById(id, signal) {
  return request(`/hotels/${id}/`, signal);
}
