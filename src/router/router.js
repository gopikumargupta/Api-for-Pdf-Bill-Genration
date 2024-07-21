import { Router } from "express";
const router = Router();
import createInvoice from "../createInvoice.js";
import { createInvoices } from "../contralllers/Invoice.controllers.js";
import Shipping from "../Module/Address.Module.js";

router.route("/").post(async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ success: false, message: "Missing request body" });
    }
    createInvoices(req.body);
    // Call the createInvoice function

    // Here you would call your function to generate the invoice
    const pdfBuffer = await createInvoice(req.body); // Assuming generateInvoice is an async function
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="invoice.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate invoice" });
  }
});

router.route("/find-by/:invoice_nr").get(async (req, res) => {
  try {
    const id = req.params["invoice_nr"];
    const invoice_nr = parseInt(id);

    // const pipeline = [
    //   {
    //     $match: {
    //       invoice_nr: invoice_nr,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "items",
    //       localField: "items",
    //       foreignField: "_id",
    //       as: "items",
    //     },
    //   },
    // ];

    const result2 = await Shipping.findOne({ invoice_nr: invoice_nr }).populate(
      "items"
    );

    const pdfBuffer = await createInvoice(result2); // Assuming generateInvoice is an async function
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="invoice.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate invoice" });
  }
});

export default router;
