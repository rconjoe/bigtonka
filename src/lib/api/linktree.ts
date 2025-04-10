export default async function linktree() {
  try {
    const results = await fetch(
      "https://amiable-perfection-production.up.railway.app/api/linktree",
    );
    const response = await results.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
