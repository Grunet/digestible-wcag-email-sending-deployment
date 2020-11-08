# digestible-wcag-email-sending-deployment

Contains scripts for periodically invoking the email sending script from a cloud provider.

## Deployment Notes

- Each secret needs to be set in its own file according to the paths specified in the docker-compose.yml

### Deployment to AWS

- Follow the instructions [here](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html) to deploy a local Docker image to AWS Elastic Container Registry

  - Using the 1 line AWS CLI piped-to-Docker option mentioned [here](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html#registry-auth-token) for getting the temporary access token needed for this seemed to be the simplest option
  - The AWS repository name doesn't need to be the same as the github repo name, but there doesn't seem to be a reason NOT to have them be the same

- Following the guidance [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/scheduled_tasks.html) the email sending task can be setup to run at a specific time each day

- Until [this](https://github.com/docker/ecs-plugin/issues/207) lands, the (upper case) version of the secrets have to be specified as environment variables in the "Container Definitions" section of the "Task Definition" in ECS
