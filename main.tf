# main.tf

# Create DynamoDB Tables
resource "aws_dynamodb_table" "customers" {
  name           = "Customers"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "CustomerID"

  attribute {
    name = "CustomerID"
    type = "S"
  }
}

# Create DynamoDB Table for Products
resource "aws_dynamodb_table" "products" {
  name           = "Products"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ProductID"

  attribute {
    name = "ProductID"
    type = "S"
  }
}

resource "aws_dynamodb_table" "supplyorders" {
  name           = "SupplyOrders"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "OrderID"

  attribute {
    name = "OrderID"
    type = "S"
  }
}

# resource "aws_dynamodb_table" "edidrills" {
#   name           = "EDIDrills"
#   billing_mode   = "PAY_PER_REQUEST"
#   hash_key       = "DrillID"

#   attribute {
#     name = "DrillID"
#     type = "S"
#   }
# }

# resource "aws_dynamodb_table" "incidents" {
#   name           = "Incidents"
#   billing_mode   = "PAY_PER_REQUEST"
#   hash_key       = "IncidentID"

#   attribute {
#     name = "IncidentID"
#     type = "S"
#   }
# }

## IAM Roles and Policies
resource "aws_iam_role" "lambda_exec" {
  name               = "lambda-exec-role"
  assume_role_policy = jsonencode({
    Version : "2012-10-17"
    Statement : [
      {
        Effect    : "Allow"
        Principal : {
          Service : "lambda.amazonaws.com"
        }
        Action    : "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy" "lambda_exec_policy" {
  name        = "lambda-exec-policy"
  description = "Policy for Lambda to access required AWS resources"
  policy      = jsonencode({
    Version : "2012-10-17"
    Statement : [
      {
        Effect   : "Allow"
        Action   : [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource : "arn:aws:logs:*:*:*"
      },
      {
        Effect   : "Allow"
        Action: [
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:UpdateItem",
          "dynamodb:PutItem"
        ],
        Resource : "arn:aws:dynamodb:us-west-2:396845391024:table/*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_exec_attach" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_exec_policy.arn
}

## Create Lambda Functions
resource "aws_lambda_function" "validate_customer" {
  function_name = "ValidateCustomer"
  runtime       = "nodejs22.x" 
  handler       = "lambda_function.handler" 
  role          = aws_iam_role.lambda_exec.arn

  filename         = "./lambda/ValidateCustomer.zip"
  source_code_hash = filebase64sha256("./lambda/ValidateCustomer.zip")
}

resource "aws_lambda_function" "check_balance" {
  function_name = "CheckBalance"
  runtime       = "nodejs22.x"
  handler       = "lambda_function.handler" 
  role          = aws_iam_role.lambda_exec.arn

  filename         = "./lambda/CheckBalance.zip"
  source_code_hash = filebase64sha256("./lambda/CheckBalance.zip")
}

resource "aws_lambda_function" "make_payment" {
  function_name = "MakePayment"
  runtime       = "nodejs22.x"
  handler       = "lambda_function.handler"
  role          = aws_iam_role.lambda_exec.arn

  filename         = "./lambda/MakePayment.zip"
  source_code_hash = filebase64sha256("./lambda/MakePayment.zip")
}

resource "aws_lambda_function" "order_supply" {
  function_name = "OrderSupply"
  runtime       = "nodejs22.x"
  handler       = "lambda_function.lambda_handler"
  role          = aws_iam_role.lambda_exec.arn

  filename         = "./lambda/OrderSupply.zip"
  source_code_hash = filebase64sha256("./lambda/OrderSupply.zip")
}

# # Create Lex Bots
# resource "aws_lex_bot" "support_bot" {
#   name = "SupportBot"
# }

# resource "aws_lex_bot" "supply_order_bot" {
#   name = "SupplyOrderBot"
# }

# resource "aws_lex_bot" "billing_bot" {
#   name = "BillingBot"
# }
