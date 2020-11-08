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
    contactsApi: {
      cognitoInfo: {
        username: getSecretOrEnvVar("dwcag_contacts_cognito_username"),
        password: getSecretOrEnvVar("dwcag_contacts_cognito_password"),
        appClientId: getSecretOrEnvVar("dwcag_contacts_cognito_appclientid"),
        userPoolId: getSecretOrEnvVar("dwcag_contacts_cognito_userpoolid"),
      },
      url: getSecretOrEnvVar("dwcag_contacts_api_url"),
    },
  };
}

(async function () {
  try {
    const {
      sendGridApiKey,
      senderEmail,
      currentSelectionServerURL,
      contactsApi,
    } = getSecrets();

    const inputs = {
      apiKeys: {
        sendGrid: {
          sendOnly: sendGridApiKey,
        },
      },
      credentials: {
        cognito: {
          contactsApiAuth: {
            username: contactsApi.cognitoInfo.username,
            password: contactsApi.cognitoInfo.password,
          },
        },
      },
      emails: {
        sender: senderEmail,
      },
      ids: {
        cognito: {
          contactsApiAuth: {
            appClientId: contactsApi.cognitoInfo.appClientId,
            userPoolId: contactsApi.cognitoInfo.userPoolId,
          },
        },
      },
      urls: {
        currentSelectionServer: currentSelectionServerURL,
        contactsApi: contactsApi.url,
      },
    };

    await sendEmailsToRecipients(inputs);
  } catch (error) {
    console.error(error);
  }
})();
