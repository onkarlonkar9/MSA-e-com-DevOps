# Mobile Shopping App – DevOps

Full-stack microservices e-commerce platform with separate frontends for customers and vendors, plus a backend and DevOps setup.

Table of Contents

Overview

Tech Stack

Features

Project Structure

Getting Started

DevOps / Deployment

Database & Security

Contributing

License

Overview

This project allows vendors to list products and customers to browse, search, purchase items. Separate vendor-dashboard and customer portal.
Integrates image upload (via AWS S3), payments (via Razorpay), roles (vendor/customer) and basic order workflow.

Tech Stack

Frontend

Customer and Vendor portals: React + TailwindCSS + React Query + Axios + React Hook Form

State management: Zustand

Build tool: Vite

AWS S3 for storage

Razorpay for payments

Backend

Node.js + Express

Sequelize ORM + MySQL

Multer for file uploads

RESTful APIs using service pattern (MVCS)

Third-Party Integrations

AWS S3 — for images (brand logos & product images)

Razorpay — payment gateway

Features
Vendor Dashboard

CRUD product listings (add/update/delete)

Manage incoming orders

Update brand logo or profile

View/manage vendor profile

Customer Portal

Browse/ search/ filter products (without login)

Add/remove items in cart

Manage address (CRUD)

Place orders (once placed, no cancellation)

Pay via Razorpay

Manage profile

Project Structure
```bash
/MSA
├── /Frontend(customer)
├── /Frontend(vendor)
├── /backend
├── /docs
├── docker-compose.yml
├── customer-nginx.conf
├── vendor-nginx.conf
└── etc.
```

Getting Started
Prerequisites

Node.js (version X or higher)

MySQL database

AWS account with S3 bucket configured

Razorpay account/API keys

Setup

Clone the repo:
```bash
git clone https://github.com/onkarlonkar9/MSA-e-com-DevOps.git
cd MSA-e-com-DevOps
```
Setup backend:
```bash
cd backend
npm install
```
# configure database in config/config.json


Create MySQL database and update config.

Run migrations:
```bash
npx sequelize db:migrate
```

Install and start frontends:

Vendor portal:
```bash
cd ../Frontend/vendor
npm install
npm run dev
```

Customer portal:
```bash
cd ../Frontend/customer
npm install
npm run dev
```


Run Docker / compose (if provided) for full stack + services:
```bash
docker-compose up --build
```

DevOps & Deployment

Uses docker-compose.yml for orchestration of backend, frontends, Nginx, database etc.

Nginx configurations for customer frontend (customer-nginx.conf) and vendor frontend (vendor-nginx.conf) provided.

Suggest CI/CD pipeline: e.g., GitHub Actions to build docker images, push to registry, deploy to server or cloud.

ENV variables: store API keys, DB credentials, AWS S3 credentials securely.

Database & Security

Database schema is normalized for scalability.

Authentication: JWT tokens stored in HTTP-only cookies.

Role-based access control: vendor, customer.

File uploads: via multer → AWS S3. Supports single (brand logo) and multiple (product images).

Payments: Razorpay Checkout + webhook. Order confirmed only after webhook callback (prevents spoofing).

Contributing

Pull requests welcome. For major changes, please open an issue to discuss first.
Make sure code adheres to linting / formatting (ESLint + Prettier).
Include tests where possible.

