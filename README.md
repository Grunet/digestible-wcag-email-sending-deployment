# digestible-wcag-email-sending-deployment

Contains scripts for periodically invoking the email sending script from a cloud provider.

## Deployment Notes

- Each secret needs to be set in its own file according to the paths specified in the docker-compose.yml
- The "volumes" section of the docker-compose.override.yml is Windows specific for local testing

### Deployment to AWS

- Follow the instructions [here](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html) to deploy a local Docker image to AWS Elastic Container Registry
  - Using the 1 line AWS CLI piped-to-Docker option mentioned [here](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html#registry-auth-token) for getting the temporary access token needed for this seemed to be the simplest option
  - The AWS repository name doesn't need to be the same as the github repo name, but there doesn't seem to be a reason NOT to have them be the same
