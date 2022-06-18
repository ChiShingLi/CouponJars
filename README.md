# CouponJars
- a website that store user-provided coupon codes for uses. Saving your wallet, one penny at a time.


# React Client
## Dependency
- **Axios**
  - for http calls
- **React router-dom**
  - for component routing



# Server

## Dependency
- **Dotenv**
  - for storing secret keys
- **Jsonwebtoken**
  - for user authentication
- **Bcrypt**
  - for hashing passwords
- **Nodemon**
  - auto restart server on file changes
- **Express**
  - for building server using Nodejs
- **Joi**
  - for validating database models
- **Mongoose**
  - for creating connections between MongoDB and the Express
- **Cors**
  - for allowing cross-origin HTTP requests

# Program used
- Visual Studio Code
- Postman
- MongoDB Compass

# Server .env setup
```js
PORT = 3001 //Your server port number, default is 3001
DB_PATH = //Your MongoDB database path
SECRET_KEY = //Your JWT secret key
```

# Route Logics
## User Route
- **POST:** **```/signup```**
  - First, check if user email ID already exists by searching in the database using ```findOne()```
    - **If exists**, return status code ```409```
  - If not exists,
    - Hash the user password using ```bcrypt```
    - Add a new record if not exists
  - return status code ```500```, if any errors arise

- **POST:** **```/login```**
  - First check if user email ID is exists or not
    - **If exists**, compare the inputted password with the hashed password
      - **If matched**, sign the payload using ```jsonwebtoken``` and return back the token to the user
      - **If not exists**, return status code ```401```
  - Return status code ```500```, if any errors arise