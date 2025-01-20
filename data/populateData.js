const AWS = require('aws-sdk');
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
                TableName: 'Billing',
                Item: record,
            }).promise();
            console.log(`Inserted billing record: ${record.BillingID}`);
        } catch (error) {
            console.error(`Error inserting billing record: ${record.BillingID}`, error);
        }
    }
}

async function populateSupplyOrdersTable() {
    const supplyOrders = [
        {
            OrderID: 'SO001',
            CustomerID: '1234',
            ProductID: '003',
            OrderDate: '2024-11-15',
            EstimatedDeliveryDate: '2024-11-16',
            Delivered: true,
            PaymentBillingID: 'BILL008',
        },
        {
            OrderID: 'SO002',
            CustomerID: '1234',
            ProductID: '003',
            OrderDate: '2024-12-15',
            EstimatedDeliveryDate: '2024-12-16',
            Delivered: true,
            PaymentBillingID: 'BILL009',
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

//   Run Functions
populateProductsTable();
populateCustomersTable();
populateBillingTable();
populateSupplyOrdersTable();