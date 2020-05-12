# Concentration

This project contains source code and supporting templates to create a serverless web app called concentration which can be found here: http://concentration-benfink.s3-website-us-east-1.amazonaws.com/templates/

The application uses several AWS resources, including Lambda functions, DynamoDB table, and an API Gateway API. These resources are defined in the `template.yaml` file in this project.



* `concentrationBackend` uses AWS Serverless Application Model (SAM) to create the serverless functions with CloudFormation (the GO function needs proper CORs headers still; `sampy` is a temporary gateway fix)
* `webApp` contains the static and dynamic (React.js) code for the client

Concentration
Project Overview
AWS Serverless Features
CloudFormation
API Gateway
Lambda Functions
Issues
DynamoDB
Integration with API Gateway
CloudFront
S3 Bucket
Other Documentation



The main objectives for this mini project are:

Experiencing the various AWS tools especially API Gateway as a customer to gain in depth understanding of our business.
Being customer-centric and understanding the pains around APIs deployment when using API Gateway.
Understanding the holistic development process for our customers
Project Overview
Concentration is a web application running a matching game. The idea was inspired by the Classic Concentration game show.

This project was created using several AWS services, seen in the diagram below:



Concentration is a web application designed with dynamic client and server sides. The goal of the website is to make a simple game that uses AWS Serverless features, namely API Gateway. You can view the code for this web application here. A Serverless Application Model (SAM) template for CloudFormation was used to deploy the serverless components, and the client side is hosted from an s3 bucket. The motivation to build such a web application is to experience AWS and API Gateway from a customer's point of view.

AWS Serverless Features
As someone who is new to using AWS, I found there to be a relatively steep learning curve to set up my serverless components. In particular, I had trouble setting up the SAM template to use API Gateway. The CloudFormation user guide (here) was useful, but it would be nice if there was a reference to this in the API Gateway developer guide.



CloudFormation
I used cloud formation with a YAML template and the SAM cli to create my back-end cloud in the stack. This is convenient to use because it sets up all specified services for you, but it is slightly difficult to format the YAML in the way SAM prefers.



API Gateway
Using API Gateway was really helpful to set up my REST API. I like that I can test in the AWS console, and it is nice to see the API call statistics. I also found it convenient to use SAM to host a local API Gateway. However, enabling CORS with the proper headers was a slight issue.



Lambda Functions
I have two back-end lambda functions (in addition to one tied to DynamoDB): one in python and one in javascript.

GET request to random emojis from the back-end based on the number of pairs specified in a query parameter
GET request to obtain the optimal board width and height based on the number of pairs specified in a query parameter
Issues
I had trouble adding response headers in the console. The one-click method did not work, and I also could not configure it manually. For example, when I tried to add CORS compliant headers, the console told me I had invalid JSON (and the text editor is not very user friendly). This was a slight issue as I did not know how to send headers from my GO lambda function; I resolved this issue by re-writing the lamda function in python.



DynamoDB
I used a DynamoDB table to store the leader board. Once I configured my DynamoDB table with a SAM template, it was very simple to connect it to API Gateway. I had no issues using the two services together.

Features of DynamoDB:

Primary Key
Hash: player_id
Global secondary index
Hash: type (always 'static' -- scores never change)
Range: Scores
Having the global secondary index made it easy to query my data to retrieve the top 10 scores. I sort these again on the client-side by ascending time in the case of a tie.



Integration with API Gateway
I used one lambda function written in javascript to hand any call to the DynamoDB leader board table

Using the ANY method catchall in API Gateway I could specify these requests in a JSON sent to the gateway:
PUT - add player's score to leader board
QUERY - Get the top 10 leaders by score
COUNT - query for the number of total people above a specified score
CloudFront
I use CloudFront to store my static website files in edge locations so the latency for the client is minimal. Although latency isn't a huge issue for my project (since I am not sending large static files, besides bundle.js), it is good to get experience setting up a CDN to improve a client's accessibility. The full url from CloudFront looks like this: http://d39rterk5lec2k.cloudfront.net/templates/

S3 Bucket
I put my html, css, and javascript files in an s3 bucket and enabled static hosting. The full url from s3 looks like this: http://concentration-benfink.s3-website-us-east-1.amazonaws.com/templates/

