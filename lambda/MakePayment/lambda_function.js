const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const tableName = 'Customers';
    try {
        // Extract CustomerID from the event (adjust structure as needed)
        const customerId = event.CustomerID;

        if (!customerId) {
            throw new Error("CustomerID is required.");
        }

        const params = {
            TableName: tableName,
            Key: {
                CustomerID: customerId // Use the primary key for lookup
            },
            UpdateExpression: "set AmountDue = :amount",
            ExpressionAttributeValues: {
                ":amount": 0 // Set AmountDue to 0
            },
            ReturnValues: "UPDATED_NEW" // Return the updated attributes
        };

        console.log("UpdateItem parameters:", JSON.stringify(params, null, 2)); // Log the params
        const result = await dynamoDB.update(params).promise();
        console.log("UpdateItem result:", JSON.stringify(result, null, 2)); // Log the result

        return {
            messages: [{
                contentType: 'PlainText',
                content: `Payment processed successfully. Your balance is now $${result.Attributes.AmountDue}.`
            }],
            sessionState: {
                dialogAction: {
                    type: 'Close'
                }
            }
        };
    } catch (error) {
        console.error('Error processing payment:', error);
        return {
            messages: [{
                contentType: 'PlainText',
                content: `Error processing payment: ${error.message}`
            }],
            sessionState: {
                dialogAction: {
                    type: 'Close'
                }
            }
        };
    }
};
