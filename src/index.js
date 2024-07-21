// index.js
import "dotenv/config";
import { app } from "./app/app.js";

import dbConnct from "./db/index.js"; // Assuming you'll create a module for

dbConnct()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// const invoice = {
//   shipping: {
//     name: "John Doe",
//     address: "1234 Main Street",
//     city: "San Francisco",
//     state: "CA",
//     country: "US",
//     postal_code: 94111,
//   },
//   items: [
//     {
//       item: "TC 100",
//       description: "Toner Cartridge",
//       quantity: 2,
//       amount: 6000,
//     },
//     {
//       item: "USB_EXT",
//       description: "USB Cable Extender",
//       quantity: 1,
//       amount: 2000,
//     },
//   ],
//   subtotal: 8000,
//   paid: 0,
//   invoice_nr: 1234,
// };

// createInvoice(invoice, "invoice.pdf");
