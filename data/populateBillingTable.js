const AWS = require('aws-sdk');
const data = require('../variables.js');

AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = 'Billing';

async function clearBillingTable() {
  try {
    console.log(`Clearing table: ${tableName}`);
    
    // Scan the table to get all items
    const scanParams = { TableName: tableName };
    const data = await dynamodb.scan(scanParams).promise();

    // Delete each item
    const deletePromises = data.Items.map(async (item) => {
      const deleteParams = {
        TableName: tableName,
        Key: {
          BillingID: item.BillingID,
        },
      };
      await dynamodb.delete(deleteParams).promise();
      console.log(`Deleted record: ${item.BillingID}`);
    });

    await Promise.all(deletePromises);
    console.log(`Table ${tableName} cleared successfully.`);
  } catch (error) {
    console.error(`Error clearing table: ${tableName}`, error);
  }
}

async function populateBillingTable() {
  const billingRecords = [
    {
      BillingID: 'BILL001',
      CustomerID: '1234',
      TransactionType: 'Subscription',
      TransactionDate: '2025-01-01',
      Amount: 100.50,
      Paid: false,
    },
    {
      BillingID: 'BILL002',
      CustomerID: '2345',
      TransactionDate: '2025-01-01',
      TransactionType: 'Subscription',
      Amount: 100.50,
      Paid: true,
    },
  ];

  for (const record of billingRecords) {
    try {
      await dynamodb.put({
        TableName: tableName,
        Item: record,
      }).promise();
      console.log(`Inserted billing record: ${record.BillingID}`);
    } catch (error) {
      console.error(`Error inserting billing record: ${record.BillingID}`, error);
    }
  }
}

clearBillingTable().then(() => populateBillingTable());
// populateBillingTable();
