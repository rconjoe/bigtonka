import { medusa, DEFAULT_REGION } from "../medusa";

export default async function getProducts() {
  try {
    const result = await medusa.store.product.list({
      fields: `*variants.calculated_price`,
      region_id: DEFAULT_REGION,
    });

    return result;
  } catch (e) {
    console.error(e);
  }
}
