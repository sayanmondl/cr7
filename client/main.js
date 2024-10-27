export async function fetchData() {
  const cachedData = sessionStorage.getItem('statsData');
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await fetch('https://cr7-backend.vercel.app/api/stats');
    const data = await response.json();
    sessionStorage.setItem('statsData', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
