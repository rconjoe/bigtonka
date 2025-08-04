export default async function getAll() {
  const api_url = import.meta.env.VITE_API_URL
  try {
    const results = await fetch(
      api_url
    );
    const response = await results.json();
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
}
