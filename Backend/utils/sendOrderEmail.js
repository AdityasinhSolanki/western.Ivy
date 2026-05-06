import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const sendOrderEmail = async (userEmail, order) => {
  try {

    console.log("EMAIL FUNCTION STARTED");
    console.log("EMAIL USER:", process.env.EMAIL_USER);
    console.log("EMAIL PASS EXISTS:", !!process.env.EMAIL_PASS);

    /* CREATE INVOICES FOLDER */

    const invoicesDir = path.join(process.cwd(), "invoices");

    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir, { recursive: true });
      console.log("INVOICES FOLDER CREATED");
    }

    const invoicePath = path.join(
      invoicesDir,
      `invoice-${order._id}.pdf`
    );

    console.log("INVOICE PATH:", invoicePath);

    /* CREATE PDF */

    console.log("STARTING PDF GENERATION");

    const doc = new PDFDocument({ margin: 40 });

    const stream = fs.createWriteStream(invoicePath);

    doc.pipe(stream);

    /* HEADER */

    doc
      .fontSize(26)
      .fillColor("#111")
      .text("WESTERN IVY", { align: "center" });

    doc
      .fontSize(12)
      .fillColor("#666")
      .text("Premium Streetwear Store", { align: "center" });

    doc.moveDown(2);

    doc
      .fontSize(20)
      .fillColor("#000")
      .text("ORDER INVOICE", { align: "center" });

    doc.moveDown(2);

    /* ORDER INFO */

    doc.fontSize(11);

    doc.text(`Order ID: ${order._id}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);

    doc.moveDown();

    /* CUSTOMER */

    doc.fontSize(13).text("Shipping Address", { underline: true });

    doc.fontSize(11);

    doc.text(order.shippingAddress?.fullName || "");
    doc.text(order.shippingAddress?.address || "");
    doc.text(
      `${order.shippingAddress?.city || ""}, ${order.shippingAddress?.state || ""}`
    );
    doc.text(`Pincode: ${order.shippingAddress?.pincode || ""}`);
    doc.text(`Phone: ${order.shippingAddress?.phone || ""}`);

    doc.moveDown(2);

    /* TABLE HEADER */

    const tableTop = doc.y;

    doc
      .fontSize(12)
      .text("Product", 50, tableTop)
      .text("Price", 300, tableTop)
      .text("Qty", 380, tableTop)
      .text("Total", 450, tableTop);

    doc.moveDown();

    let y = tableTop + 30;

    for (const item of order.items || []) {

      doc
        .fontSize(11)
        .text(item.name || "", 50, y)
        .text(`₹${item.price || 0}`, 300, y)
        .text(item.quantity || 1, 380, y)
        .text(`₹${(item.price || 0) * (item.quantity || 1)}`, 450, y);

      y += 40;

      /* PREVENT PAGE OVERFLOW */

      if (y > 700) {
        doc.addPage();
        y = 50;
      }
    }

    /* TOTAL */

    doc
      .moveDown(2)
      .fontSize(14)
      .text(`Total Amount: ₹${order.totalPrice || 0}`, {
        align: "right"
      });

    doc.moveDown(2);

    /* FOOTER */

    doc
      .fontSize(11)
      .fillColor("#555")
      .text(
        "Thank you for shopping with Western Ivy!",
        { align: "center" }
      );

    doc
      .text(
        "If you have any questions about your order, contact support.",
        { align: "center" }
      );

    /* FINISH PDF */

    await new Promise((resolve, reject) => {

      stream.on("finish", resolve);

      stream.on("error", (err) => {
        console.log("STREAM ERROR:", err);
        reject(err);
      });

      doc.end();

    });

    console.log("PDF GENERATED SUCCESSFULLY");

    /* NODEMAILER */

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    console.log("TRANSPORTER CREATED");

    /* MAIL OPTIONS */

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Your Western Ivy Order Invoice",
      text:
        `Thank you for shopping with Western Ivy!

Your order has been placed successfully.

Order ID: ${order._id}

Total Amount: ₹${order.totalPrice || 0}

Your invoice PDF is attached below.`,
      attachments: [
        {
          filename: `invoice-${order._id}.pdf`,
          path: invoicePath
        }
      ]
    };

    console.log("SENDING MAIL...");

    /* SEND MAIL */

    await transporter.sendMail(mailOptions);

    console.log("MAIL SENT SUCCESSFULLY");

  } catch (err) {

    console.log("SEND ORDER EMAIL ERROR:");
    console.log(err);

  }
};