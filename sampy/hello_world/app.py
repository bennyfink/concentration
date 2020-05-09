import json

# import requests

def genBoard(size):
    factors = []
    for i in range(2, size+1):
        if size%i is 0:
            factors.append(i)
    
    optimal = []
    optimal.append(factors[int(len(factors)/2-1)])
    optimal.append(size / optimal[0])

    optimal.sort()

    return optimal


def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """

    # try:
    #     ip = requests.get("http://checkip.amazonaws.com/")
    # except requests.RequestException as e:
    #     # Send some context about this error to Lambda Logs
    #     print(e)

    #     raise e

    pairs = event['queryStringParameters']['pairs']


        

    bestFactors = genBoard(int(pairs) * 2)
    return {
        "statusCode": 200,
        "headers": {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,},
        "body": json.dumps({
            "message": bestFactors[0],
            # "location": ip.text.replace("\n", "")
        }),
    }
'''if not pairs > 1:
            if not pairs < 33:
                return {
                "headers": json.dumps({ 
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': True,}),
                "statusCode": 400,
                "body": json.dumps({
                    "message": "not a valid pair input",
                    # "location": ip.text.replace("\n", "")
                 }),
                }
        "headers": {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,}

'''