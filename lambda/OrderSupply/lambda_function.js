const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const tableName = 'SupplyOrders'; // Updated table name

    try {
        const { OrderID, CustomerID, Delivered, EstimatedDeliveryDate, OrderDate, ItemName, OrderAmount } = event;

        if (!OrderID || !CustomerID || !ItemName || !OrderAmount) {
            throw new Error("Missing required fields: OrderID, CustomerID, ItemName, or OrderAmount.");
        }

        const params = {
            TableName: tableName,
            Item: {
                OrderID: OrderID,
                CustomerID: CustomerID,
                Delivered: Delivered || false,
                EstimatedDeliveryDate: EstimatedDeliveryDate || null,
                OrderDate: OrderDate || new Date().toISOString().split('T')[0],
                ItemName: ItemName,
                OrderAmount: OrderAmount
            }
        };

        console.log("PutItem parameters:", JSON.stringify(params, null, 2)); // Log the request
        await dynamoDB.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Order added successfully", OrderID }),
        };
    } catch (error) {
        console.error("Error adding order:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
