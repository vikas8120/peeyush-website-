const twilio = require("twilio");

module.exports = (phone) => {
    const sid = process.env.TWILIO_SID;
    const auth = process.env.TWILIO_AUTH;
    const fromPhone = process.env.TWILIO_PHONE;

    if (!sid || !auth || !fromPhone || !sid.startsWith("AC")) {
        console.warn("Twilio credentials missing or invalid. Skipping SMS.");
        return;
    }

    try {
        const client = twilio(sid, auth);
        client.messages.create({
            body: "Your booking at Gunjan Digital Studio is confirmed 📸",
            from: fromPhone,
            to: phone,
        })
            .then(message => console.log("SMS sent: ", message.sid))
            .catch(err => console.error("Error sending SMS: ", err));
    } catch (error) {
        console.error("Twilio Initialization Error:", error.message);
    }
};
