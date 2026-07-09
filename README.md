# Merze E-commerce Application

A full-stack e-commerce web application that allows users to browse products, manage a shopping cart, and place orders through a smooth and intuitive interface.
Built to demonstrate real-world frontend–backend integration, reusable UI components, and RESTful API design.

Built with a React frontend, Node.js/Express backend, and MongoDB database.

---

## Technologies
- React JS
- React Router
- Node.js
- Express
- MongoDB
- JavaScript (ES6+)
- REST APIs
- Bootstrap

---

## 🌐 Demo

- **Frontend:** [Live Demo](https://my-ecommerce-frontend-khaki.vercel.app/)
- **Backend API:** [Backend API](https://my-ecommerce-eta-ruby.vercel.app/)
- 🎥 **Loom Walkthrough:** [Watch Here](https://www.loom.com/share/25adf0ed43c242d1adc0fad96495302f)

---

## Authentication

This project was built before I learned authentication with JWT, Clerk, or OAuth.

Users can register with an email address and log in using that same email. The application does not implement secure authentication or password hashing. The primary focus of this project was building a complete e-commerce workflow, including product browsing, shopping cart management, order placement, and RESTful API integration.

Secure authentication is listed as a future improvement.

---

## ⚡ Quick Start  

### 1. Clone and run the backend

```bash
git clone https://github.com/Rakeshneopane/merze-ecommerce-backend.git
cd merze-ecommerce-backend
npm install
npm run dev
```

### 2. Clone and run the frontend

Open a second terminal:

```bash
git clone https://github.com/Rakeshneopane/merze-ecommerce-frontend.git
cd merze-ecommerce-frontend
npm install
npm run dev
```

The frontend communicates with the backend running on `http://localhost:4000`.

---

## 🔐 Environment Setup

### Frontend

Create a `.env` file inside the frontend project:

```env
VITE_BASE_URI=http://localhost:4000
```

For production:

```env
VITE_BASE_URI=https://my-ecommerce-eta-ruby.vercel.app
```

### Backend

Create a `.env` file inside the backend project:

```env
PORT=4000
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string
```

For production, replace the localhost URLs with your deployed backend URL.

> **Note:**
>
> - Restart the development server after updating the `.env` file.
> - Add `.env` to `.gitignore` to avoid committing sensitive credentials.

---

## ✨ Features

### Product Browsing
- Displays a list of all products
- Filters products by section and type
- Displays detailed product information

### Cart & Orders
- Adds products to the shopping cart
- Updates product quantity in the cart
- Removes products from the cart
- Places orders with a selected delivery address (Cash on Delivery only for now)

### User Management
- Registers new users
- Allows users to log in using their email
- Displays user profile and full order history
- Adds, updates, and deletes delivery addresses

### UI & Architecture
- Uses reusable React components
- Implements client-side routing with React Router
- Handles loading, empty, and error states predictably

---

## API Reference

### Products
- `GET /api/products` – Fetch all products
- `GET /api/products/:productId` – Fetch product by ID
- `POST /api/create-products` – Create product (admin)
- `POST /api/products/:productId` – Update product
- `DELETE /api/products/:productId` – Delete product

### Sections & Types
- `GET /sections` – Fetch all sections
- `POST /sections` – Create section
- `GET /types` – Fetch all types
- `POST /types` – Create type

### Users
- `POST /api/users` – Create a user
- `GET /api/users` – Fetch all users
- `GET /api/user/:id` – Fetch user by ID
- `DELETE /api/user/:id` – Delete user

### Addresses
- `POST /api/users/:id/addresses` – Add address
- `POST /api/users/:userId/addresses/:addressId` – Update address
- `DELETE /api/users/:userId/addresses/:addressId` – Delete address

### Orders
- `POST /api/orders` – Place an order

### Authentication
- `POST /api/auth/login` – Login user via email

### Sample Response (`GET /api/products`)

```json
{
  "data": [
    {
      "_id": "6904310714d0f05c914f6527",
      "title": "Nike Air Zoom Pegasus 40",
      "price": 11999,
      "category": "Footwear",
      "rating": 3.7,
      "sellerId": "seller_102",
      "stock": 42,
      "section": {
        "_id": "6915ce9f5dcdf96da56681cd",
        "name": "Men",
        "images": [
          "https://media.gettyimages.com/id/1141653922/photo/the-three-crew-members-of-nasas-apollo-11-lunar-landing-mission-pose-for-a-group-portrait-a.jpg?s=612x612&w=0&k=20&c=Aw7OhPFLeFfEaOjuNribMjCpSnIKMK-vmD8iSS0OawM="
        ],
        "__v": 0,
        "createdAt": "2025-11-13T12:27:11.052Z",
        "updatedAt": "2025-11-13T12:27:11.052Z"
      }
  ]
}
```

---

## 📷 Screenshots

![Homepage](./public/image1.png)
![Product Listing](./public/image2.png)
![Shopping Cart](./public/image3.png)
![Checkout](./public/image.png)

---

## Future Improvements

- Secure JWT-based authentication with password hashing
- Protected routes for authenticated users
- Role-based authorization (Admin/User)
- Payment gateway integration (Stripe / Razorpay)
- Admin dashboard access control

---

## 📬 Contact

For bugs, feedback, or feature requests, feel free to reach out:

- 📧 Email: rakeshneopane@gmail.com
- 📧 Alternate Email: lucasneopane123@gmail.com
- 💼 LinkedIn: https://linkedin.com/in/rakesh-neopane

