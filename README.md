# digestible-wcag-email-sending-deployment

Contains scripts for periodically invoking the email sending script from a cloud provider.

## Deployment Notes

- Each secret needs to be set in its own file according to the paths specified in the docker-compose.yml
- The "volumes" section of the docker-compose.override.yml is Windows specific for local testing
