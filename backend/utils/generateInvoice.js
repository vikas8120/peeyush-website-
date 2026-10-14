const PDFDocument = require("pdfkit");

module.exports = (booking, res) => {
    const doc = new PDFDocument();
    doc.pipe(res);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=invoice-${booking._id}.pdf`);

    doc.fontSize(20).text("Gunjan Digital Studio", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Invoice ID: ${booking._id}`);
    doc.moveDown();

    doc.text(`Client: ${booking.name}`);
    doc.text(`Phone: ${booking.phone || 'N/A'}`);
    doc.text(`Shoot Type: ${booking.shootType || 'Service'}`);
    doc.text(`Date: ${booking.date || new Date().toLocaleDateString()}`);
    doc.moveDown();

    doc.fontSize(16).text(`Amount Paid: Rs. ${booking.amount}`, { underline: true });

    doc.end();
};
