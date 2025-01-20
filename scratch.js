const AWS = require('aws-sdk');

// Configure DynamoDB for local use
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2', // Region doesn't matter for DynamoDB Local
    endpoint: 'http://localhost:8000' // DynamoDB Local endpoint
});

const tableName = 'Billing';

// Function to test DynamoDB queries
async function runTests() {
    try {
        console.log("Inserting a test record...");
        await insertTestRecord('12345', 50.75);

        console.log("Fetching the record...");
        const record = await getBalance('12345');
        console.log("Record fetched:", record);

        console.log("Updating the balance...");
        await updateBalance('12345', 0);

        console.log("Fetching the updated record...");
        const updatedRecord = await getBalance('12345');
        console.log("Updated record:", updatedRecord);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Insert a record
async function insertTestRecord(customerId, balance) {
    const params = {
        TableName: tableName,
        Item: {
            CustomerID: customerId,
            OutstandingBalance: balance
        }
    };

    await dynamoDB.put(params).promise();
    console.log(`Record inserted for CustomerID: ${customerId}`);
}

// Fetch a balance
async function getBalance(customerId) {
    const params = {
        TableName: tableName,
        Key: {
            CustomerID: customerId
        }
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item || {};
}

// Update a balance
async function updateBalance(customerId, newBalance) {
    const params = {
        TableName: tableName,
        Key: {
            CustomerID: customerId
        },
        UpdateExpression: 'SET OutstandingBalance = :balance',
        ExpressionAttributeValues: {
            ':balance': newBalance
        }
    };

    await dynamoDB.update(params).promise();
    console.log(`Balance updated for CustomerID: ${customerId}`);
}

// Run the tests
runTests().catch(console.error);
