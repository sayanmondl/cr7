export async function fetchData() {
  try {
    const response = await fetch('https://cr7-backend.vercel.app/api/stats');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
