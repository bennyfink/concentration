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
            let json = {Item: params, TableName: body.tableName}
            response = postScore(json).then((response) => {return response});
            return response;
        case 'read':
            dynamo.get({Key: {player_id: body.id}, TableName: body.tableName}, (err, data) => {
                console.log(data)
            });
            break;
        case 'query':
            response = queryThis().then((response) => {return response});
            return response;
        case 'count':
            response = getCount(body.score).then((response) => {return response});
            return response;
        default:
            callback(`Unknown operation: ${operation}`);
    }
};

async function queryThis() {
    let tryThis = {
        KeyConditionExpression: "#n = :n",
        IndexName: "get-scores",
        ConsistentRead: false,
        ExpressionAttributeNames: {
            "#n": "type"
        },
        ExpressionAttributeValues: {
            ":n" : 'static'
        },
        ScanIndexForward: false,
        Limit: 10,
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

async function getCount(score) {
    let tryThis = {
        KeyConditionExpression: "#n = :n and #s > :s",
        IndexName: "get-scores",
        ConsistentRead: false,
        ExpressionAttributeNames: {
            "#n": "type",
            "#s": "score"
        },
        ExpressionAttributeValues: {
            ":n" : 'static',
            ":s": score
        },
        ScanIndexForward: false,
        Select: 'COUNT',
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

async function postScore(score) {
    await dynamo.put(score).promise();
    return  {
        'statusCode': 201,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        'body': "success!"
    };
}

