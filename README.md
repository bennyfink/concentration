# Concentration

This project contains source code and supporting templates to create a serverless web app called concentration which can be found here: http://concentration-benfink.s3-website-us-east-1.amazonaws.com/templates/

The application uses several AWS resources, including Lambda functions, DynamoDB table, and an API Gateway API. These resources are defined in the `template.yaml` file in this project.



* `concentrationBackend` uses AWS Serverless Application Model (SAM) to create the serverless functions with CloudFormation (the GO function needs proper CORs headers still; `sampy` is a temporary gateway fix)
* `webApp` contains the static and dynamic (React.js) code for the client


= (% style="font-family:Arial,Helvetica,sans-serif" %)**Concentration**(%%) =

{{toc scope="LOCAL"/}}


(% style="font-family:Arial,Helvetica,sans-serif" %)The main objectives for this mini project are:

* (% style="font-family:Arial,Helvetica,sans-serif" %)Experiencing the various AWS tools especially API Gateway as a customer to gain in depth understanding of our business.
* (% style="font-family:Arial,Helvetica,sans-serif" %)Being customer-centric and understanding the pains around APIs deployment when using API Gateway.
* (% style="font-family:Arial,Helvetica,sans-serif" %)Understanding the holistic development process for our customers

== (% style="color:#0096d6; font-family:Arial,Helvetica,sans-serif" %)**Project Overview**(%%) ==

Concentration is a web application running a matching game. The idea was inspired by the [[Classic Concentration game show>>https://youtu.be/t8ZHb9cQ4pQ?t=242]](% style="font-family:Arial,Helvetica,sans-serif" %).

(% style="font-family:Arial,Helvetica,sans-serif" %)This project was created using several AWS services, seen in the diagram below:

(% style="font-family:Arial,Helvetica,sans-serif" %)[[image:Screen Shot 2020-05-12 at 6.47.33 PM.png||alt="A flow chart descibing my use of CloudFormation, CloudFront, API Gateway, Lambda funtions, DynamoDB table, and s3 bucket"]]

(% id="hcwo-clipboard-contents" style="font-family: ~"Amazon Ember~"; font-size: 11pt; font-weight: normal; font-style: normal; text-decoration: none; color: rgb(0, 0, 0); text-align: left;" %)
(((
(% class="hcwo_main" data-hcwo-lh-ratio="1.31" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 0px;" %)
(% style="font-family:Arial,Helvetica,sans-serif" %)[[(% class="wikiinternallink" style="font-family: Arial, Helvetica, sans-serif; color: rgb(0, 0, 255); font-family: Arial, Helvetica, sans-serif; font-weight: normal; text-decoration: underline" %)__Concentration__>>http://d39rterk5lec2k.cloudfront.net/templates/||class="hcwo_hyperlink" data-hcwo-hyperlink-id="354" data-hcwo-hyperlink-type="link" rel="noopener noreferrer" target="_blank" title="http://concentration-benfink.s3-website-us-east-1.amazonaws.com/templates/"]](% style="color:#2c3e50; font-family:Arial,Helvetica,sans-serif; font-weight:normal" %) is a web application designed with dynamic client and server sides. The goal of the website is to make a simple game that uses AWS Serverless features, namely API Gateway. (% style="color:#2c3e50; font-family:Arial,Helvetica,sans-serif" %)You can view the code for this web application (% style="font-family:Arial,Helvetica,sans-serif" %)[[(% style="font-family: Arial, Helvetica, sans-serif; color: rgb(0, 0, 255); font-family: Arial, Helvetica, sans-serif; text-decoration: underline" %)__here__>>url:https://github.com/bennyfink/concentration||class="hcwo_hyperlink" data-hcwo-hyperlink-id="758" data-hcwo-hyperlink-type="link" rel="noopener noreferrer" target="_blank" title="https://github.com/bennyfink/concentration"]](% style="color:#2c3e50" %). (% style="color:#2c3e50; font-family:Arial,Helvetica,sans-serif; font-weight:normal" %)A Serverless Application Model (SAM) template for CloudFormation was used to deploy the serverless components, and the client side is hosted from an s3 bucket. The motivation to build such a web application is to experience AWS and API Gateway from a customer's point of view.
)))

== (% style="color:#0096d6; font-family:Arial,Helvetica,sans-serif" %)**AWS Serverless Features**(%%) ==

(% id="hcwo-clipboard-contents" style="font-family: ~"Amazon Ember~"; font-size: 11pt; font-weight: normal; font-style: normal; text-decoration: none; color: rgb(0, 0, 0); text-align: left;" %)
(((
(% class="hcwo_main" data-hcwo-lh-ratio="1.31" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 0px;" %)
(% style="color:#2c3e50; font-family:Arial,Helvetica,sans-serif; font-weight:normal" %)As someone who is new to using AWS, I found there to be a relatively steep learning curve to set up my serverless components. In particular, I had trouble setting up the SAM template to use API Gateway. The CloudFormation user guide ((% style="font-family:Arial,Helvetica,sans-serif; font-weight:normal" %)[[(% class="wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink wikiinternallink" style="font-family: Arial, Helvetica, sans-serif; font-weight: normal; color: rgb(0, 0, 255); font-family: Arial, Helvetica, sans-serif; font-weight: normal; text-decoration: underline" %)__here__>>url:https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_ApiGateway.html||class="hcwo_hyperlink" data-hcwo-hyperlink-id="1407" data-hcwo-hyperlink-type="link" rel="noopener noreferrer" target="_blank" title="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_ApiGateway.html"]](% style="color:#2c3e50; font-family:Arial,Helvetica,sans-serif" %)) was useful, but it would be nice if there was a reference to this in the API Gateway developer guide.


(% class="hcwo_paragraph_heading_1 hcwo_main" data-hcwo-lh-ratio="1.31" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" data-hcwo-org-style="padding-bottom: 1px; line-height: 1.31;" data-hcwo-pstyle="hcwo_paragraph_heading_1" style="padding-bottom: 1px; line-height: 1; font-family: Arial; font-size: 14pt; text-align: left; margin-bottom: 0px; margin-top: 20px;" %)
=== (% style="font-family:Arial,Helvetica,sans-serif; font-size:12pt; font-style:italic; font-weight:normal" %)//CloudFormation//(%%) ===

(% style="color:#2c3e50" %)I used cloud formation with a YAML template and the SAM cli to create my back-end cloud in the stack. This is convenient to use because it sets up all specified services for you, but it is slightly difficult to format the YAML in the way SAM prefers.


(% class="hcwo_paragraph_heading_1 hcwo_main" data-hcwo-lh-ratio="1.31" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" data-hcwo-org-style="padding-bottom: 1px; line-height: 1.31;" data-hcwo-pstyle="hcwo_paragraph_heading_1" style="padding-bottom: 1px; line-height: 1; font-family: Arial; font-size: 14pt; text-align: left; margin-bottom: 0px; margin-top: 20px;" %)
=== (% style="font-family:Arial,Helvetica,sans-serif; font-size:12pt; font-style:italic; font-weight:normal" %)//API Gateway//(%%) ===

(% class="hcwo_main" data-hcwo-lh-ratio="1.31" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 0px;" %)
(% style="color:#2c3e50; font-family:Arial,Helvetica,sans-serif; font-size:11pt; font-style:normal; font-weight:normal" %)Using API Gateway was really helpful to set up my REST API. I like that I can test in the AWS console, and it is nice to see the API call statistics. I also found it convenient to use SAM to host a local API Gateway. However, enabling CORS with the proper headers was a slight issue.


(% class="hcwo_main" data-hcwo-lh-ratio="1.31" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 20px;" %)
==== (% style="font-family:Arial,Helvetica,sans-serif; font-size:12pt; font-weight:bold" %)**Lambda Functions**(%%) ====

(% class="hcwo_main" data-hcwo-lh-ratio="1.31" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 0px;" %)
(% style="color:#2c3e50; font-family:Arial,Helvetica,sans-serif; font-size:11pt" %)I have two back-end lambda functions (in addition to one tied to DynamoDB): one in python and one in javascript.

* (% style="color:#2c3e50" %)GET request to random emojis from the back-end based on the number of pairs specified in a query parameter
* (% style="color:#2c3e50" %)GET request to obtain the optimal board width and height based on the number of pairs specified in a query parameter

(% class="hcwo_main" data-hcwo-lh-ratio="1.31" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 20px;" %)
==== (% style="font-family:Arial,Helvetica,sans-serif; font-size:12pt; font-weight:bold" %)**Issues**(%%) ====

(% class="hcwo_main" data-hcwo-lh-ratio="1.31" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 0px;" %)
(% style="color:#2c3e50; font-family:Arial,Helvetica,sans-serif; font-size:11pt" %)I had trouble adding response headers in the console. The one-click method did not work, and I also could not configure it manually. For example, when I tried to add CORS compliant headers, the console told me I had invalid JSON (and the text editor is not very user friendly). This was a slight issue as I did not know how to send headers from my GO lambda function; I resolved this issue by re-writing the lamda function in python.


(% class="hcwo_main" data-hcwo-lh-ratio="1.16" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 20px;" %)
=== (% style="font-family:Arial; font-size:12pt; font-style:italic" %)//DynamoDB//(%%) ===

(% class="hcwo_main data-hcwo-parabreak" data-hcwo-lh-ratio="1.31" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 0px;" %)
(% style="color:#2c3e50; font-family:Arial,Helvetica,sans-serif; font-size:11pt; font-style:normal" %)I used a DynamoDB table to store the leader board. Once I configured my DynamoDB table with a SAM template, it was very simple to connect it to API Gateway. I had no issues using the two services together.

(% class="hcwo_main data-hcwo-parabreak" data-hcwo-lh-ratio="1.31" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 20px;" %)
(% style="color:#2c3e50" %)Features of DynamoDB:

* (% style="color:#2c3e50" %)Primary Key
** (% style="color:#2c3e50" %)Hash: player_id
* (% style="color:#2c3e50" %)Global secondary index
** (% style="color:#2c3e50" %)Hash: type (always 'static' ~-~- scores never change)
** (% style="color:#2c3e50" %)Range: Scores

(% class="hcwo_main data-hcwo-parabreak" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 20px;" %)
(% style="color:#2c3e50" %)Having the global secondary index made it easy to query my data to retrieve the top 10 scores. I sort these again on the client-side by ascending time in the case of a tie.


(% class="hcwo_main" data-hcwo-lh-ratio="1.31" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 20px;" %)
==== (% style="font-family:Arial,Helvetica,sans-serif; font-size:12pt; font-weight:bold" %)**Integration with API Gateway**(%%) ====

(% class="hcwo_main data-hcwo-parabreak" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 0px;" %)
(% style="color:#2c3e50" %)I used one lambda function written in javascript to hand any call to the DynamoDB leader board table

* (% style="color:#2c3e50" %)Using the ANY method catchall in API Gateway I could specify these requests in a JSON sent to the gateway:
** (% style="color:#2c3e50" %)PUT - add player's score to leader board
** (% style="color:#2c3e50" %)QUERY - Get the top 10 leaders by score
** (% style="color:#2c3e50" %)COUNT - query for the number of total people above a specified score

(% class="hcwo_main" data-hcwo-lh-ratio="1.16" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 20px;" %)
=== (% style="font-family:Arial; font-size:12pt; font-style:italic" %)//CloudFront//(%%) ===
)))

(% data-hcwo-clipboard="true" data-hcwo-doc-id="b896879da9eff9f6c78cab7a4d7cadcecd20fb10473fb89cd472bdbf7a138d6d" %)
(((
(% style="color:#2c3e50" %)I use CloudFront to store my static website files in edge locations so the latency for the client is minimal. Although latency isn't a huge issue for my project (since I am not sending large static files, besides bundle.js), it is good to get experience setting up a CDN to improve a client's accessibility. The full url from CloudFront looks (% style="color:#2c3e50; font-family:Arial,Helvetica,sans-serif" %)like this: (% style="font-family:Arial,Helvetica,sans-serif" %)[[http:~~/~~/d39rterk5lec2k.cloudfront.net/templates/>>url:http://d39rterk5lec2k.cloudfront.net/templates/leaderboard.html||style="font-family: -webkit-standard; font-style: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" title="http://d39rterk5lec2k.cloudfront.net/templates/leaderboard.html"]]

(% id="hcwo-clipboard-contents" style="font-family: ~"Amazon Ember~"; font-size: 11pt; font-weight: normal; font-style: normal; text-decoration: none; color: rgb(0, 0, 0); text-align: left;" %)
(((
(% class="hcwo_main" data-hcwo-lh-ratio="1.16" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 20px;" %)
=== (% style="font-family:Arial; font-size:12pt; font-style:italic" %)//S3 Bucket//(%%) ===
)))

(% data-hcwo-clipboard="true" data-hcwo-doc-id="b896879da9eff9f6c78cab7a4d7cadcecd20fb10473fb89cd472bdbf7a138d6d" %)
(((
(% style="color:#2c3e50" %)I put my html, css, and javascript files in an s3 bucket and enabled static hosting. The full url from s3 looks (% style="color:#2c3e50; font-family:Arial,Helvetica,sans-serif" %)like this: (% style="font-family:Arial,Helvetica,sans-serif" %)[[http:~~/~~/concentration-benfink.s3-website-us-east-1.amazonaws.com/templates/>>url:http://concentration-benfink.s3-website-us-east-1.amazonaws.com/templates/||style="font-family: -webkit-standard; font-style: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" title="http://concentration-benfink.s3-website-us-east-1.amazonaws.com/templates/"]]
)))


(% id="hcwo-clipboard-contents" style="font-family: ~"Amazon Ember~"; font-size: 11pt; font-weight: normal; font-style: normal; text-decoration: none; color: rgb(0, 0, 0); text-align: left;" %)
(((
(% class="hcwo_main" data-hcwo-lh-ratio="1.16" data-hcwo-lh-relative="1" data-hcwo-line-rule="auto" style="padding-bottom: 1px; line-height: 1; margin-bottom: 0px; margin-top: 20px;" %)
== (% style="color:#0096d6; font-family:Arial,Helvetica,sans-serif" %)**Other Documentation**(%%) ==
)))

* [[GitHub repo>>https://github.com/bennyfink/concentration]] for this project
* [[Brief memo>>https://amazon.awsapps.com/workdocs/index.html#/document/b896879da9eff9f6c78cab7a4d7cadcecd20fb10473fb89cd472bdbf7a138d6d]] reiterating much of this information on a 1-pager
* [[Slide deck>>https://drive.corp.amazon.com/documents/finkelsb@/Concentration%20Overview.pdf]] reiterating much of this information
* [[A document>>https://amazon.awsapps.com/workdocs/index.html#/document/b896879da9eff9f6c78cab7a4d7cadcecd20fb10473fb89cd472bdbf7a138d6d]] with many links (with some description) that I found helpful along the way
)))

 
)))
