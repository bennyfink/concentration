# Concentration

This project contains source code and supporting templates to create a serverless web app called concentration which can be found here: http://concentration-benfink.s3-website-us-east-1.amazonaws.com/templates/

The application uses several AWS resources, including Lambda functions, DynamoDB table, and an API Gateway API. These resources are defined in the `template.yaml` file in this project.



* `concentrationBackend` uses AWS Serverless Application Model (SAM) to create the serverless functions with CloudFormation (the GO function needs proper CORs headers still; `sampy` is a temporary gateway fix)
* `webApp` contains the static and dynamic (React.js) code for the client

