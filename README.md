# digestible-wcag-email-sending-deployment

Contains scripts for periodically invoking the email sending script from a cloud provider.

## Deployment Notes

- Each secret needs to be set in its own file according to the paths specified in the docker-compose.yml
- The "volumes" section of the docker-compose.override.yml is Windows specific for local testing

### Deployment to AWS

- Follow the instructions [here](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html) to deploy a local Docker image to AWS Elastic Container Registry

  - Using the 1 line AWS CLI piped-to-Docker option mentioned [here](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html#registry-auth-token) for getting the temporary access token needed for this seemed to be the simplest option
  - The AWS repository name doesn't need to be the same as the github repo name, but there doesn't seem to be a reason NOT to have them be the same

- Following the guidance [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/scheduled_tasks.html) the email sending task can be setup to run at a specific time each day

- Until [this](https://github.com/docker/ecs-plugin/issues/207) lands, the (upper case) version of the secrets have to be specified as environment variables in the "Container Definitions" section of the "Task Definition" in ECS
- A copy of the default "ecsTaskExecutionRole" IAM role for the task has to be made and an "S3 access" policy added to it in order for it to be able to pull from the S3 bucket the "digestible-wcag-contact-management" repository currently uses
  - This should probably be decoupled as that repo evolves and adds complexity
