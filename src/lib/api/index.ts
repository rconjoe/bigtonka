export default async function getAll() {
  try {
    const results = await fetch(
      "https://amiable-perfection-production.up.railway.app/api/getAll",
    );
    const response = await results.json();
    return response;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
