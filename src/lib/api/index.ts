export default async function getAll() {
  try {
    const results = await fetch(
      // env var? this is to a railway fcn
      "https://amiable-perfection-production.up.railway.app/api/getAll",
    );
    const response = await results.json();
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
}
