var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();

/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - tableName: required for operations that interact with DynamoDB
 *   - payload: a parameter to pass to the operation being performed
 */
exports.lambdaHandler = function(event, context, callback) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    let response;
    

    var body = JSON.parse(event.body)
    console.log('PAYLOAD:', body.operation)
    var operation = body.operation

    //check this output locally or try on server
    console.log(body)

    //check this
    console.log(body.tableName)

    var params = {
       // TableName: body.tableName,
        player_id: body.id,
        name: body.name, 
        score: body.score,
        type:body.type,
        time: body.time
    }

    switch (operation) {
        case 'create':
            dynamo.put({Item: params, TableName: body.tableName}, callback);
            break;
        case 'read':
            dynamo.get({Key: {player_id: body.id}, TableName: body.tableName}, (err, data) => {
                console.log(data)
            });
            break;
        case 'update':
            dynamo.update(body.payload, callback);
            break;
        case 'delete':
            dynamo.delete(body.payload, callback);
            break;
        case 'query':
            response = queryThis().then((response) => {return response})
            return response;
            break;
        case 'echo':
            console.log('PAYLOAD:', event.body)
             response = {
                'statusCode': 201,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    },
                'body': JSON.stringify({
                'message': "success"
                    // location: ret.data.trim()
                }),};
            callback(null, response)
        case 'ping':
            callback(null, "pong");
            break;
        default:
            callback(`Unknown operation: ${operation}`);
    }
};

async function queryThis() {
        let tryThis = {KeyConditionExpression: "#n = :n",
                         IndexName: "get-scores",
                        ConsistentRead: false,
                        ExpressionAttributeNames: {
                            "#n": "type"
                        },
                        ExpressionAttributeValues: {
                            ":n" : 'static'
                        },
                        ScanIndexForward: false,
                        Limit: 3,
                        Select: 'ALL_ATTRIBUTES',
                        TableName: 'leaderboard'}
                    return  {
                        'statusCode': 200,
                        'headers': {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': true,
                        },
                        'body': JSON.stringify(await dynamo.query(tryThis).promise())
                    };
    }
