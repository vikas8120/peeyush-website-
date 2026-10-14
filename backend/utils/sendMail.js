const nodemailer = require("nodemailer");

const sendMail = async (data) => {
    if (!process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'your-app-password') {
        console.warn('Email credentials missing or invalid. Skipping Email.');
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Gunjan Studio" <${process.env.EMAIL}>`,
            to: process.env.EMAIL,
            subject: "New Contact Enquiry",
            html: `
        <h3>New Client Enquiry</h3>
        <p>Name: ${data.name}</p>
        <p>Phone: ${data.phone}</p>
        <p>Email: ${data.email}</p>
        <p>Message: ${data.message}</p>
        `,
        });
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};

module.exports = sendMail;
