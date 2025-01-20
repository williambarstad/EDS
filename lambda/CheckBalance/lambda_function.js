const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const tableName = 'Customers'; // Update to the correct table name
    try {
        // Replace with actual event structure if necessary
        const customerId = event.CustomerID; 

        const params = {
            TableName: tableName,
            Key: {
                CustomerID: customerId // Use the primary key for lookup
            }
        };

        console.log("GetItem parameters:", JSON.stringify(params, null, 2)); // Log GetItem params
        const result = await dynamoDB.get(params).promise();
        console.log("GetItem result:", JSON.stringify(result, null, 2)); // Log GetItem result

        if (result.Item) {
            const balance = result.Item.AmountDue || 0; // Retrieve AmountDue, default to 0 if not present
            return {
                messages: [{
                    contentType: 'PlainText',
                    content: `Your outstanding balance is $${balance}.`
                }],
                sessionState: {
                    dialogAction: {
                        type: 'Close'
                    }
                }
            };
        } else {
            return {
                messages: [{
                    contentType: 'PlainText',
                    content: 'No customer record found for the given Customer ID.'
                }],
                sessionState: {
                    dialogAction: {
                        type: 'Close'
                    }
                }
            };
        }
    } catch (error) {
        console.error('Error fetching balance:', error);
        return {
            messages: [{
                contentType: 'PlainText',
                content: `Error fetching balance: ${error.message}`
            }],
            sessionState: {
                dialogAction: {
                    type: 'Close'
                }
            }
        };
    }
};
