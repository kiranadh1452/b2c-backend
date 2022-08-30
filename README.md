## B-2-C Model Implementation (Backend)

### NodeJS based ecommerce platform.

-   This repository contains the backend code for a simple B-2-C model.
-   It supports multi-vendor ecommerce.
-   It is being developed using Express and MongoDB.

## Users involved:

-   Customer
-   Seller (Vendor)
-   Admin

## User Specific Roles

-   ### Customer

    -   View and Search for a product.
    -   Add product to cart.
    -   Remove product from cart.
    -   Buy product/s.
    -   View cart.
    -   View order history.
    -   View order details.

-   ### Seller

    -   View inventory.
    -   Send KYC for verification
    -   Add product to inventory.
    -   Remove product from inventory.
    -   View sales.

-   ### Admin
    -   View all sellers.
    -   View all customers.
    -   Verify seller.
    -   Bann seller

## How to run the server ?
- Clone this repository
- Run the following command to install dependencies.
    ```bash
    npm install
    ```
- Go inside the 'config' directory and add a file `.env` with entries for required environment variables.
- Start the server using the following command.
    ```bash
    npm start
    ```
> Under development
