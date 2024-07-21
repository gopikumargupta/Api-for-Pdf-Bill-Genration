import fs from "fs";
import PDFDocument from "pdfkit";

function createInvoice(invoice, path) {
  return new Promise((resolve, reject) => {
    let subtotal = 0;
    invoice.items.forEach((element) => {
      subtotal += element.amount * element.quantity;
    });

    let doc = new PDFDocument({ size: "A4", margin: 50 });
    let pdfBuffer = [];

    generateHeader(doc);
    generateCustomerInformation(doc, invoice, subtotal);
    generateInvoiceTable(doc, invoice, subtotal);
    generateFooter(doc);
    doc.on("data", (chunk) => {
      pdfBuffer.push(chunk);
    });

    doc.on("end", () => {
      resolve(Buffer.concat(pdfBuffer));
    });

    doc.end();
  });
}

function generateHeader(doc) {
  doc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("DEMO INVOICE", 110, 57)
    .fontSize(10)
    .text("DEMO INDUSTRIES", 200, 50, { align: "right" })
    .text("Demo Street  Demo City", 200, 65, { align: "right" })
    .text("Demo India, 70007", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice, subtotal) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(`${invoice.invoice_nr}`, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(subtotal - parseInt(invoice.paid)),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.address, 300, customerInformationTop + 15)
    .text(
      invoice.city + ", " + invoice.state + ", " + invoice.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice, subtotal) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount),
      item.quantity,
      formatCurrency(item.amount * item.quantity)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

export default createInvoice;
