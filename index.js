const { get: getSecretOrEnvVar } = require("docker-secrets-nodejs");
const { sendEmailsToRecipients } = require("digestible-wcag-email-sending");

function getSecrets() {
  return {
    //The env variable fallbacks are the uppercase versions of the secret names
    mockSubscriberEmail: getSecretOrEnvVar("mock_subscriber_email"), //Temporary to enable local testing until the subscriber code is decoupled into its own service
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
      mockSubscriberEmail, //Temporary to enable local testing until the subscriber code is decoupled into its own service
      sendGridApiKey,
      senderEmail,
      currentSelectionServerURL,
    } = getSecrets();

    const inputs = {
      dependencies: {
        //Temporary to enable local testing until the subscriber code is decoupled into its own service
        getSubscribers: !!mockSubscriberEmail
          ? function () {
            return {
              "subscribers": [
                {
                  "email": mockSubscriberEmail
                }
              ]
            };
          }
          : undefined,
      },
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
