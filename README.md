
# Extra-Dimensional Security (EDS) - "Securing Your Reality, One Dimension at a Time"

![EDS](/assets/EDS-0.png)


Welcome to **Extra-Dimensional Security (EDS)**, the premier service provider in safeguarding your dimension from extra-dimensional incursions (EDIs). Inspired by the world-renowned principles depicted in HBO's *Watchmen*, our call center and support services offer unparalleled protection for your reality.

## Who We Are

At EDS, we specialize in detecting, managing, and mitigating threats from alternate dimensions. Whether it's a minor breach or a full-scale dimensional crisis, EDS ensures that your safety and the integrity of your dimension remain our top priority.

### Our Mission
To provide rapid, effective, and reliable responses to extra-dimensional threats, ensuring peace of mind for all citizens across every known and unknown reality.

## Why Choose EDS?

- **Advanced Technology**: Utilizing state-of-the-art detection systems and AI-driven analytics to monitor dimensional anomalies in real time.
- **24/7 Call Center Support**: Our team is available around the clock to address your concerns and deploy solutions immediately.
- **Comprehensive Training**: All EDS agents undergo rigorous training to handle a variety of scenarios, from minor disruptions to large-scale EDIs.
- **Warranty Support**: Faulty EDS equipment? No problem! Our call center will assist in processing replacements under warranty.

## Services We Offer

### Incident Response
- Immediate support for dimensional breaches.
- Guidance for containment and resolution.
- Access to our elite field agents for on-site intervention.

### Equipment Replacement
- Fast-tracked replacement for under-warranty items.
- Assistance in ordering additional supplies such as Reflectatine rolls, Perimeter Sensors, and Control Boxes.

### Preventative Measures
- Regular Extra-Dimensional Incursion (EDI) drills to ensure readiness (recommended once every six weeks).
- Advanced detection systems to identify potential threats before they materialize.

## How to Get Started

1. **Contact Us**: Call our 24/7 hotline or connect with us via our online portal.
2. **Explain the Issue**: Provide details of the anomaly or issue.
3. **Receive Support**: Our team will provide immediate assistance and dispatch agents or replacement equipment as needed.

## Testimonials

> "Thanks to EDS, our dimension remains untouched. Their team responded to our breach in minutes and handled it like pros!"  
— J. Crawford, Tulsa, OK

> "The EDS Reflectatine system saved our town from a major incursion. Worth every penny!"  
— W. Reeves, New York, NY

## Get in Touch

For more information about our services or to report a dimensional anomaly, please contact us:

- **Phone**: 1-800-SECURE-DIMENSIONS
- **Email**: support@eds.com
- **Website**: [www.extra-dimensional-security.com](http://www.extra-dimensional-security.com)

### Remember: Securing Your Reality Is Our Reality

---
# No, but really... A Note from EDS

![EDS Main Flow](/assets/wade.png)

While this project is purely fictional and inspired by the imaginative world of HBO's *Watchmen*, it highlights the creative potential of a call center dedicated to solving unique and humorous "problems." Beyond the humor, it underscores how advanced customer service systems, like Amazon Connect, can be adapted for almost any scenario—real or imagined. So, while we may not be safeguarding alternate dimensions anytime soon, the concept is a fun and engaging demonstration of what’s possible.


---

# EDS Main Flow - Amazon Connect Configuration

![EDS Main Flow](/assets/eds-2.png)

Welcome to the **EDS Main Flow** repository! This project showcases the design and implementation of a robust Amazon Connect contact flow for **Extra-Dimensional Security (EDS)**, ensuring top-notch support for managing extra-dimensional incursions and customer service needs.

## Overview

The **EDS Main Flow** contact flow is designed to provide seamless support for EDS customers. The system offers multiple paths for handling technical support, ordering supplies, and billing inquiries, with integrations into Amazon Lex and DynamoDB for advanced functionality.

### Features

- **Greeting and Instructions**: Welcomes customers with a branded message: "Securing your reality, one dimension at a time."
- **Amazon Lex Integration**:
  - Supports intents for technical support, supply orders, and billing.
  - Easily extendable with additional intents for future functionality.
- **Dynamic Routing**:
  - Routes customers to the appropriate queue based on their intent.
  - Provides error handling and fallback options.
- **Custom Messaging**: Engaging prompts for technical support, supply orders, and billing assistance.
- **Multi-Channel Support**: Ready for expansion into voice, chat, and other channels supported by Amazon Connect.
- **DynamoDB Integration** (future enhancement):
  - Supplies ordering integrates with DynamoDB to create and store records.

### Flow Diagram

The flow is visualized with decision points, prompts, and Lex integrations:
- **Entry Point**: Welcomes customers and identifies intent.
- **Intent Processing**:
  - Technical Support → Transfers to a support queue.
  - Order Supplies → Prompts for items and processes orders.
  - Billing → Provides current balance and accepts payments.

### Requirements

- **Amazon Connect**: Configured instance with queues for Technical Support and Billing.
- **Amazon Lex**: Bot named `EDSCallCenter` with intents for:
  - `TechnicalSupportIntent`
  - `OrderSupplyIntent`
  - `BillingIntent`
- **DynamoDB**: Table for tracking order records (future implementation).

### Getting Started

1. **Import the Flow**:
   - Open your Amazon Connect instance.
   - Navigate to **Contact Flows** and click **Create Contact Flow**.
   - Import the JSON file (`EDS Main Flow.json`) into your contact flow editor.

2. **Configure Lex Bot**:
   - Deploy the Lex bot (`EDSCallCenter`) and associate it with your Amazon Connect instance.
   - Ensure intents and aliases match the flow configuration.

3. **Set Up Queues**:
   - Add queues for `TechnicalSupport` and `Billing` in Amazon Connect.

4. **Testing**:
   - Test each intent path to verify smooth transitions and error handling.

### Future Enhancements

- **Supply Ordering System**:
  - Integrate with a Lambda function to handle DynamoDB operations.
- **Billing Automation**:
  - Add payment processing through third-party integrations.
- **Enhanced Reporting**:
  - Leverage Contact Lens for detailed analytics on customer interactions.

### JSON File Structure

The JSON configuration contains:
- **Metadata**: Positions and descriptions for visual flow editing.
- **Actions**: Definitions for prompts, transitions, and integrations.

### Contribution

We welcome contributions to enhance the EDS Main Flow. Feel free to submit issues or pull requests.
