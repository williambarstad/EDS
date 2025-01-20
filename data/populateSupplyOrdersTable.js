const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-west-2'});

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function populateSupplyOrdersTable() {
  const supplyOrders = [
    {
      OrderID: 'SO001',
      CustomerID: '1234',
      OrderDate: '2024-11-15',
      Delivered: true,
      EstimatedDeliveryDate: '2024-11-15',
      ItemName: 'ControlBox',
      OrderAmount: 1200.5
    },
    {
      OrderID: 'SO002',
      CustomerID: '1234',
      OrderDate: '2024-12-15',
      Delivered: true,
      EstimatedDeliveryDate: '2024-11-15',
      ItemName: 'Sensors',
      OrderAmount: 300
    },
    {
      OrderID: 'SO003',
      CustomerID: '1234',
      OrderDate: '2024-12-15',
      Delivered: true,
      EstimatedDeliveryDate: '2024-11-15',
      ItemName: 'Reflectatine',
      OrderAmount: 44.95
    },
  ];

  for (const order of supplyOrders) {
    try {
      await dynamodb.put({
        TableName: 'SupplyOrders',
        Item: order,
      }).promise();
      console.log(`Inserted supply order: ${order.OrderID}`);
    } catch (error) {
      console.error(`Error inserting supply order: ${order.OrderID}`, error);
    }
  }
}

populateSupplyOrdersTable();

