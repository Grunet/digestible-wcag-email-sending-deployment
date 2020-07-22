const { sendEmailsToRecipients } = require("digestible-wcag-email-sending");

(async function () {
  try {
    const { sendGridApiKey, senderEmail } = getSecrets();

    const inputs = {
      apiKeys: {
        sendGrid: {
          sendOnly: sendGridApiKey,
        },
      },
      emails: {
        sender: senderEmail,
      },
    };

    await sendEmailsToRecipients(inputs);
  } catch (error) {
    console.error(error);
  }
})();

function getSecrets() {
  return {
    sendGridApiKey: "",
    senderEmail: "",
  };
}
