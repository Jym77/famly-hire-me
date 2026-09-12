export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = new URL(`http://localhost:3000${endpoint}`);
  url.searchParams.append('token', 'admin');

  const response = await fetch(url.toString(), options);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response;
}
