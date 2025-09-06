import getProducts from "./products";

export default async function getAll() {
  const api_url = import.meta.env.VITE_API_URL;
  try {
    const _content = await fetch(api_url);
    const content = await _content.json();
    const products = await getProducts();
    const response = {
      content,
      products,
    };
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
}
