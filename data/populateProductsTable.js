const AWS = require('aws-sdk');
const data = require('../variables.js');

AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function populateProductsTable() {
  const products = [
    {
      ProductID: '001',
      ProductName: 'EDS Control Unit',
      ProductDescription: 'EDS control unit for perimeter sensors. Includes 1-year warranty',
      Price: 1200.99,
      Stock: 10,
    },
    {
      ProductID: '002',
      ProductName: 'Perimeter Sensor, 10-pack',
      ProductDescription: 'Perimeter sensor for early-warning EDI protection',
      Price: 799.49,
      Stock: 25,
    },
    {
      ProductID: '003',
      ProductName: 'Reflectatine, roll of 100m',
      ProductDescription: 'Reflexive, flexible material for home and personal protection',
      Price: 199.99,
      Stock: 50,
    }
  ];

  for (const product of products) {
    try {
      await dynamodb.put({
        TableName: 'Products',
        Item: product,
      }).promise();
      console.log(`Inserted product: ${product.ProductID}`);
    } catch (error) {
      console.error(`Error inserting product: ${product.ProductID}`, error);
    }
  }
}

populateProductsTable();
