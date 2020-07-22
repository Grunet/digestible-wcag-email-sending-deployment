const { sendEmailsToRecipients } = require("digestible-wcag-email-sending");

(async function () {
  try {
    const inputs = {};

    await sendEmailsToRecipients(inputs);
  } catch (error) {
    console.error(error);
  }
})();
