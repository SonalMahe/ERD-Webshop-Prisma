# ERD-Webshop-Prisma
Transfer your ERD into Prisma models, seed fake data, and experiment with Express endpoints using req.body, req.params, and req.query. 

A simple backend API for a webshop built using Node.js, Express, and Prisma ORM.
It supports products, categories, orders, and basic admin protection.

Features--
Create, update, delete products
Filter products by category and price
Many-to-many relationship (Products ↔ Categories)
Orders and order items system
Pagination support
Simple API key authentication (admin routes)
Prisma ORM with database migrations
Seed script for sample data

 Tech Stack--
Node.js
Express.js
Prisma ORM
SQLite / PostgreSQL (depending on config)
TypeScript

Project Structure--
prisma/
  schema.prisma
  seed.ts
index.ts

Setup Instructions--
1. Install dependencies
npm install
2. Setup Prisma
npx prisma generate
npx prisma migrate dev
3. Seed database
npx prisma db seed
4. Start server
npx nodemon index.ts

Server runs on:

http://localhost:3000


📌 API Endpoints
1) Products
2) Create product (Admin only)
POST /products

3) Get products (with filters )
GET /products?page=1&limit=10&category=Electronics
4) Update product
PATCH /products/:id
Orders
5) Delete order (Admin only)
DELETE /orders/:orderId


🔗 Database Relations
One order → many order items
One customer → many orders
🧪 Testing

Use: for test API-

Insomnia
