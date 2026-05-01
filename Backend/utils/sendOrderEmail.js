import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import axios from "axios";

export const sendOrderEmail = async (userEmail, order) => {

  const invoicePath = path.join(process.cwd(), "invoices", `invoice-${order._id}.pdf`);

  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(fs.createWriteStream(invoicePath));

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

  doc.text(order.shippingAddress.fullName);
  doc.text(order.shippingAddress.address);
  doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state}`);
  doc.text(`Pincode: ${order.shippingAddress.pincode}`);
  doc.text(`Phone: ${order.shippingAddress.phone}`);

  doc.moveDown(2);

  /* TABLE HEADER */

  const tableTop = doc.y;

  doc
    .fontSize(12)
    .text("Product", 140, tableTop)
    .text("Price", 330, tableTop)
    .text("Qty", 400, tableTop)
    .text("Total", 450, tableTop);

  doc.moveDown();

  let y = tableTop + 30;

  for (const item of order.items) {

    let imageBuffer = null;

    try {
      const response = await axios.get(item.image, { responseType: "arraybuffer" });
      imageBuffer = Buffer.from(response.data);
    } catch (err) {
      console.log("Image load failed");
    }

    if (imageBuffer) {
      doc.image(imageBuffer, 50, y - 5, { width: 60, height: 60 });
    }

    doc
      .fontSize(11)
      .text(item.name, 140, y)
      .text(`₹${item.price}`, 330, y)
      .text(item.quantity, 400, y)
      .text(`₹${item.price * item.quantity}`, 450, y);

    y += 70;
  }

  doc.moveDown();

  /* TOTAL */

  doc
    .moveDown(2)
    .fontSize(14)
    .text(`Total Amount: ₹${order.totalPrice}`, { align: "right" });

  doc.moveDown(2);

  /* FOOTER */

  doc
    .fontSize(11)
    .fillColor("#555")
    .text("Thank you for shopping with Western Ivy!", { align: "center" });

  doc
    .text("If you have any questions about your order, contact support.", { align: "center" });

  doc.end();

  /* EMAIL */

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Your Western Ivy Order Invoice",
    text: "Thank you for your order. Your invoice is attached. Hope to see you again soon!",
    attachments: [
      {
        filename: `invoice-${order._id}.pdf`,
        path: invoicePath
      }
    ]
  };

  await transporter.sendMail(mailOptions);
};