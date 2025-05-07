# 📘 API Endpoints Guide for Frontend Team

## 🔐 Authentication Endpoints (JWT)

| Endpoint                 | Method | Description                                                  |
|--------------------------|--------|--------------------------------------------------------------|
| `/api/token/`            | POST   | Obtain access and refresh tokens using `username` and `password`. |
| `/api/token/refresh/`    | POST   | Refresh access token using a valid refresh token.            |

---

## 👤 User Account Endpoints

| Endpoint              | Method | Description                                 |
|-----------------------|--------|---------------------------------------------|
| `/api/register/`      | POST   | Register a new user account.                |
| `/api/login/`         | POST   | Login user using session-based auth.        |
| `/api/logout/`        | POST   | Logout user (session-based).                |
| `/api/check_login/`   | GET    | Check if user is logged in (session-based). |

> ⚠️ Prefer JWT for authentication. Use session-based login only if needed.

---

## 📇 Contact Person Endpoints

| Endpoint                          | Method | Description                              |
|-----------------------------------|--------|------------------------------------------|
| `/api/contactpersons/`           | GET    | Get list of all contact persons.         |
| `/api/contactpersons/`           | POST   | Create a new contact person.             |
| `/api/contactpersons/<id>/`      | GET    | Retrieve details of a specific contact person. |
| `/api/contactpersons/<id>/`      | PUT    | Update an existing contact person.       |
| `/api/contactpersons/<id>/`      | DELETE | Delete a contact person.                 |

---

## 📦 Product Endpoints

| Endpoint                    | Method | Description                     |
|-----------------------------|--------|---------------------------------|
| `/api/products/`           | GET    | Get list of all products.       |
| `/api/products/`           | POST   | Create a new product.           |
| `/api/products/<id>/`      | GET    | Retrieve a specific product.    |
| `/api/products/<id>/`      | PUT    | Update product information.     |
| `/api/products/<id>/`      | DELETE | Delete a product.               |

---

## 🏢 Supplier Endpoints

| Endpoint                    | Method | Description                           |
|-----------------------------|--------|---------------------------------------|
| `/api/suppliers/`           | GET    | Get list of all suppliers.            |
| `/api/suppliers/`           | POST   | Add a new supplier.                   |
| `/api/suppliers/<id>/`      | GET    | Retrieve supplier details by ID.      |
| `/api/suppliers/<id>/`      | PUT    | Update a supplier’s information.      |
| `/api/suppliers/<id>/`      | DELETE | Delete a supplier by ID.              |

---

## 📝 Developer Notes

- Submit all request bodies as JSON (`Content-Type: application/json`).
- All API URLs are prefixed with `http://localhost:8000/api/`.
