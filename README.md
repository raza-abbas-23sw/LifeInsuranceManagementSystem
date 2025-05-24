# State Life Insurance Management System (SLIMS)

## Overview

SLIMS is a comprehensive digital solution designed to empower State Life Insurance agents with powerful tools for client management, policy administration, and business growth. This modern web application transforms manual insurance processes into an efficient digital workflow, enabling agents to focus on client relationships rather than paperwork.

## Key Features

### Policy Holder Management System
- **Complete Client Profiles**: Store comprehensive client information including:
  - Personal details (name, CNIC, date of birth)
  - Contact information (WhatsApp, email)
  - Policy specifics (number, type, sum assured)
  - Payment history (premium amounts, dates)
- **Automated Reminders**: System sends email notifications one month before premium due dates to ensure timely payments and maintain policy continuity
- **Search & Filter**: Quickly locate any policy holder with advanced search capabilities across all data fields

### Intelligent Plan Generator
- **Customized Projections**: Generate detailed policy illustrations showing:
  - Annual premium calculations
  - Bonus accumulation schedules
  - Maturity value projections
  - Death benefit coverage
- **Interactive Interface**: User-friendly forms with dynamic calculations adjust instantly to client parameters
- **Plan Comparisons**: Side-by-side analysis of different policy options

### Comprehensive Policy Administration
- **Full CRUD Operations**:
  - Create new policy records with intuitive forms
  - Read/View complete policy details
  - Update client information as circumstances change
  - Delete obsolete records
- **Document Management**: Digital storage of all policy-related documents

### Business Development Tools
- **Product Catalog**: Detailed information on all State Life insurance plans
- **WhatsApp Integration**: Direct click-to-chat functionality connects clients instantly with agents
- **Client Attraction Tools**: Professional plan illustrations to demonstrate policy benefits to prospects

### Knowledge Base
- **FAQ Section**: 50+ commonly asked questions about State Life products and services
- **Educational Resources**: Policy explanations and insurance concepts

## Technical Architecture

### Frontend
- **React.js** with Vite for fast development
- **React Router** for seamless navigation
- **Framer Motion** for engaging animations
- **Material-UI** for consistent UI components
- **Form Validation** with React Hook Form
- **EmailJS** for contact form functionality
- **WhatsApp API** integration for direct communication

### Backend
- **Node.js** with Express.js server
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** for secure access
- **Cookie-based sessions**
- **Automated Email Service** for premium reminders
  
## Project Structure

```slims/
├── client/ # Frontend application
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── assets/ # Images and media
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Application screens
│ │ ├── routes/ # Navigation configuration
│ │ └── utils/ # Helper functions
│ └── vite.config.js # Build configuration
│
├── server/ # Backend application
│ ├── controllers/ # Business logic
│ ├── models/ # Database schemas
│ ├── routes/ # API endpoints
│ ├── middleware/ # Authentication
│ └── server.js # Server entry point
│
└── README.md # Project documentation
