const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    //const customerId = event.Details.ContactData.Attributes.CustomerID; // CustomerID from calculated attribute
    const customerId = event.CustomerID; 
    const tableName = 'Customers'; 

    try {
        const params = {
            TableName: tableName,
            Key: { CustomerID: customerId }
        };

        console.log("Query parameters:", JSON.stringify(params, null, 2)); // Log query params
        const result = await dynamoDb.get(params).promise();

        console.log("Query result:", JSON.stringify(result, null, 2)); // Log query result

        if (result.Item) {
            return {
                statusCode: 200,
                isAuthenticated: true,
                message: 'Customer authenticated successfully.',
            };
        } else {
            return {
                statusCode: 400,
                isAuthenticated: false,
                message: 'Invalid or inactive CustomerID.',
            };
        }
    } catch (error) {
        console.error('Error querying DynamoDB:', error);
        return {
            statusCode: 500,
            isAuthenticated: false,
            message: 'Internal server error.',
        };
    }
};
