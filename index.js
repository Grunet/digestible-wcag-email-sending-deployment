const { get: getSecretOrEnvVar } = require("docker-secrets-nodejs");
const { sendEmailsToRecipients } = require("digestible-wcag-email-sending");

function getSecrets() {
  return {
    //The env variable fallbacks are the uppercase versions of the secret names
    sendGridApiKey: getSecretOrEnvVar("dwcag_apikeys_sendgrid_sendonly"),
    senderEmail: getSecretOrEnvVar("dwcag_emails_sender"),
  };
}

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
