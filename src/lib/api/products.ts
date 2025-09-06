import { medusa } from "../medusa";

export default async function getProducts() {
  try {
    const result = await medusa.store.product.list({
      fields: `*variants.calculated_price`,
      region_id: "reg_01K49C2Y6MXY9ZNG0XCRCNBN1N",
    });

    return result;
  } catch (e) {
    console.error(e);
  }
}
