import item from "../Module/itemDetails.Module.js";
import Shipping from "../Module/Address.Module.js";

export async function createInvoices(body) {
  try {
    const { items, payment, subtotal, invoice_nr } = body;
    const { name, address, city, state, country } = body;

    const newShipping = new Shipping({
      name,
      address,
      city,
      state,
      country,
      payment,
      subtotal,
      invoice_nr,
    });

    const savedShipping = await newShipping.save();

    let savedItems = [];
    let calculatedTotalAmount = 0;

    for (let i = 0; i < items.length; i++) {
      const { quantity, description, amount } = items[i];

      const newItem = new item({
        quantity,
        description,
        amount,
        totalamount: amount, // Adjust this as per your calculation logic
      });
      calculatedTotalAmount += amount;

      const savedItem = await newItem.save();

      savedItems.push(savedItem);
      savedShipping.items.push(savedItems[i]); // Accumulate the total amount
    }
    await savedShipping.save();
  } catch (error) {
    console.error("Error creating invoice:", error);
  }
}
