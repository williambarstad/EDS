const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.lambda_handler = async (event) => {
    console.log("Received event:", JSON.stringify(event, null, 2));
    // const customerID = event.requestAttributes?.CustomerID || "Unknown";
    // const customerID = event.CustomerID || "Unknown";
    const intentName = event.sessionState.intent.name;
    const sessionAttributes = event.sessionState.sessionAttributes || {};
    const slots = event.sessionState.intent.slots || {};

    // Initialize or retrieve cart and total
    const cart = JSON.parse(sessionAttributes.cart || "{}");
    let total = parseFloat(sessionAttributes.total || "0.0");

    // Pricing dictionary for reference
    // TODO: Table-drive inventory, for both the lex ProductType slot type list and this pricinig list
    const pricing = {
        "control box": 50.0,
        "reflectatine": 20.0,
        "sensors": 5.0
    };

    // Handle OrderSupplies Intent
    if (intentName === "OrderSupplies") {
        const productType = slots.ProductType?.value?.interpretedValue || "";
        const quantity = parseInt(slots.Quantity?.value?.interpretedValue, 10);

        // Check for invalid quantity or empty product type
        if (isNaN(quantity) || quantity <= 0) {
            return {
                sessionState: {
                    dialogAction: {
                        type: "ElicitSlot",
                        slotToElicit: "Quantity"
                    },
                    intent: event.sessionState.intent, // Pass the current intent back
                },
                messages: [
                    {
                        contentType: "PlainText",
                        content: "The quantity must be a positive number. How many would you like to order?"
                    }
                ],
                sessionAttributes: sessionAttributes || {} // Ensure sessionAttributes is properly handled
            };
        }

        if (!pricing[productType]) {
            return {
                sessionState: {
                    dialogAction: {
                        type: "ElicitSlot",
                        slotToElicit: "ProductType"
                    },
                    intent: event.sessionState.intent, // Pass the current intent back
                },
                messages: [
                    {
                        contentType: "PlainText",
                        content: `'${productType}' is not a valid product. Please choose from control box, reflectatine, or sensors.`
                    }
                ],
                sessionAttributes: sessionAttributes || {} // Ensure sessionAttributes is properly handled
            };
        }

        // Update the cart
        cart[productType] = (cart[productType] || 0) + quantity;
        total += pricing[productType] * quantity;

        // Update session attributes
        sessionAttributes.cart = JSON.stringify(cart);
        sessionAttributes.total = total.toFixed(2);

        // Sync contact attributes THIS CNA BE REMOVED
        sessionAttributes.contactCart = sessionAttributes.cart;
        sessionAttributes.contactTotal = sessionAttributes.total;

        return {
            sessionState: {
                dialogAction: { type: "Close" },
                sessionAttributes,
                intent: { name: "OrderSupplies", state: "Fulfilled" }
            },
            messages: [
                {
                    contentType: "PlainText",
                    content: `Successfully added ${quantity} ${productType}(s) to your cart. Your current cart:\n${Object.entries(cart).map(([item, qty]) => `- ${qty} ${item}(s)`).join("\n")}\nRunning total: $${total.toFixed(2)}.`
                }
            ]
        };
    }

    // Handle Checkout Intent
    if (intentName === "Checkout") {
        if (Object.keys(cart).length === 0) {
            return {
                sessionState: {
                    dialogAction: {
                        type: "Close"
                    },
                    sessionAttributes
                },
                messages: [
                    {
                        contentType: "PlainText",
                        content: "Your cart is empty. Add items to your cart before checking out."
                    }
                ],
                intent: {
                    name: "Checkout",
                    state: "Fulfilled"
                }
            };
        }

        const customerID = sessionAttributes.CustomerID || "Unknown";

        const orderDetails = Object.entries(cart).map(([item, qty]) => ({
            ProductType: item,
            Quantity: qty,
        }));

        const orderID = `order-${Date.now()}`;
        const orderData = {
            OrderID: orderID,
            CustomerID: customerID, 
            Items: orderDetails,
            Total: total.toFixed(2),
            OrderDate: new Date().toISOString()
        };

        console.log("Order Data:", JSON.stringify(orderData, null, 2));

        await dynamoDB
            .put({
                TableName: "SupplyOrders",
                Item: orderData
            })
            .promise();

        sessionAttributes.cart = "{}";
        sessionAttributes.total = "0.00";

        sessionAttributes.contactCart = sessionAttributes.cart;
        sessionAttributes.contactTotal = sessionAttributes.total;

        return {
            sessionState: {
                dialogAction: {
                    type: "Close"
                },
                sessionAttributes,
                intent: {
                    name: "Checkout",
                    state: "Fulfilled"
                }
            },
            messages: [
                {
                    contentType: "PlainText",
                    content: `Your order has been placed successfully! Order ID: ${orderID}.\n\nThank you for shopping with us.`
                }
            ]
        };
    }

    // Handle ClearCart Intent
    if (intentName === "ClearCart") {
        sessionAttributes.cart = "{}";
        sessionAttributes.total = "0.00";

        sessionAttributes.contactCart = sessionAttributes.cart;
        sessionAttributes.contactTotal = sessionAttributes.total;

        return {
            sessionState: {
                dialogAction: {
                    type: "Close"
                },
                sessionAttributes,
                intent: {
                    name: "ClearCart",
                    state: "Fulfilled"
                }
            },
            messages: [
                {
                    contentType: "PlainText",
                    content: "Your cart has been cleared. You can start adding items again."
                }
            ]
        };
    }

    // handle Fallback Intent
    if (intentName === "FallbackIntent") {
        // Log unmatched input for analysis
        console.log("Fallback triggered with input:", JSON.stringify(event.inputTranscript, null, 2));

        return {
            sessionState: {
                dialogAction: {
                    type: "Close"
                },
                sessionAttributes
            },
            messages: [
                {
                    contentType: "PlainText",
                    content: "I'm sorry, I didn't quite understand that. You can say things like 'Order supplies,' 'Check out,' or 'Clear my cart.'"
                }
            ]
        };
    }

    return {
        sessionState: {
            dialogAction: {
                type: "Close"
            },
            sessionAttributes
        },
        messages: [
            {
                contentType: "PlainText",
                content: "Something went wrong. Please try again."
            }
        ]
    };
};
