const AWS = require('aws-sdk');
const data = require('../variables.js');

AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function populateCustomersTable() {
  const customers = [
    {
      CustomerID: '1234',
      Name: 'Wade Tillman',
      PhoneNumber: '303-818-8025',
      Email: 'wjbarstad@gmail.com',
      AmountDue: 100.50,
    },
    {
      CustomerID: '2345',
      Name: 'Jane Smith',
      PhoneNumber: '303-818-8025',
      Email: 'wjbarstad@gmail.com',
      AmountDue: 50.50,
    },
    {
      CustomerID: '3456',
      Name: 'Alice Johnson',
      PhoneNumber: '303-818-8025',
      Email: 'wjbarstad@gmail.com',
      AmountDue: 0.00,
    },
    {
      CustomerID: '4567',
      Name: 'Bob Brown',
      PhoneNumber: '303-818-8025',
      Email: 'wjbarstad@gmail.com',
      AmountDue: 0.00,
    },
  ];

  for (const customer of customers) {
    try {
      await dynamodb.put({
        TableName: 'Customers',
        Item: customer,
      }).promise();
      console.log(`Inserted customer: ${customer.CustomerID}`);
    } catch (error) {
      console.error(`Error inserting customer: ${customer.CustomerID}`, error);
    }
  }
}

populateCustomersTable();
