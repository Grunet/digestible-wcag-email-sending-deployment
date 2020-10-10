const { get: getSecretOrEnvVar } = require("docker-secrets-nodejs");
const { sendEmailsToRecipients } = require("digestible-wcag-email-sending");

function getSecrets() {
  return {
    //The env variable fallbacks are the uppercase versions of the secret names
    sendGridApiKey: getSecretOrEnvVar("dwcag_apikeys_sendgrid_sendonly"),
    senderEmail: getSecretOrEnvVar("dwcag_emails_sender"),
    currentSelectionServerURL: getSecretOrEnvVar(
      "dwcag_urls_current_selection_server"
    ),
  };
}

(async function () {
  try {
    const {
      sendGridApiKey,
      senderEmail,
      currentSelectionServerURL,
    } = getSecrets();

    const inputs = {
      apiKeys: {
        sendGrid: {
          sendOnly: sendGridApiKey,
        },
      },
      emails: {
        sender: senderEmail,
      },
      urls: {
        currentSelectionServer: currentSelectionServerURL,
      },
    };

    await sendEmailsToRecipients(inputs);
  } catch (error) {
    console.error(error);
  }
})();
