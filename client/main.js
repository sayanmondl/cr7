export async function fetchData() {
  try {
    const response = await fetch('/api/stats');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
