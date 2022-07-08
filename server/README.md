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
- **@joi/date**
  - for further extends the .date() validation functionlity
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

# Installing dependency
- To get started, use the node package manager (NPM) to install all the packages by using the command:
```
npm install
```

# Usage
- To startup the backend server:
  - this command script will startup the backend node server of our app using ```nodemon```.
```
npm run startDev
````


# Route Logics
## User Route
- **POST:** **```/signup```**
  - First, check if user email ID already exists by searching in the database using ```findOne()```
    - **If exists**, return status code ```409```
  - If not exists,
    - Hash the user password using ```bcrypt```
    - Add a new record if not exists
  - return status code ```500```, if any errors arise

<hr>

- **POST:** **```/login```**
  - First check if user email ID is exists or not
    - **If exists**, compare the inputted password with the hashed password
      - **If matched**, sign the payload using ```jsonwebtoken``` and return back the token to the user
      - **If not exists**, return status code ```401```
  - Return status code ```500```, if any errors arise


<hr>

- **PATCH:** **```/changePassword```**
 - user's token is validated by ```validateAuth``` middleware and the input schema is valid
  - if the user's token is...
    - **VALID:**
      - check if the user's current password is equal to the new password
        - if same, return back status code ```500```
      - get find the user in the database based on their ```_id```
      - check & validate again if their current password after hashing is same as the hashed password in the database
        - if true, hash the new password and update their password into the database
        - return back status code ```200```
    - **INVALID:** 
      - return back status code ```500```

<hr>

- **PATCH:** **```/changeName```**
- **Note:** the default user's display name is ```null```
  - user's token is validated by ```validateAuth``` middleware and the input schema is valid
    - if the user's token is...
      - **VALID:**
        - check if the user's display name is already taken
          - if true, return back status code ```409```
        - else, find the user's record by their ```_.id```
        - update their display name
        - return back status code ```200```
      - **INVALID:** 
        - return back status code ```500```

## Post Route

- **POST:** **```/post```**
  - user's token is validated by ```validateAuth``` middleware and the input schema is valid
  - if the user's token is...
    - **VALID:**
      - store the decoded token in ```req.decoded``` request
      - ```poster``` object is then populated by current logged-in user's ID using value from ```req.decoded._id```
      - new post is then created on the server
      - return back status code ```200```
    - **INVALID:** 
      - return back status code ```500```

<hr>

- **PATCH:** **```/post/like```**
- user's token is validated by ```validateAuth``` middleware and the input schema is valid
- if the user's token is...
    - **VALID:**
      - allow the user to like the post
      - increment the post's like count by ```1```
      - push the post's ```_id``` into the user's likes array for keeping track of the post that liked
     - return back status code ```201```
    - **INVALID:** 
      - return back status code ```500```

<hr>

- **PATCH:** **```/post/comment```**
- user's token is validated by ```validateAuth``` middleware and the input schema is valid
- if the user's token is...
    - **VALID:**
      - find the post object to be updated using ```findByIdAndUpdate()```
      - **If the post is found:**
        - push the the new comment into the existing comment's array
        - return back status code ```201```
      - **else:**
        - return back status code ```500``` 
    - **INVALID:** 
      - return back status code ```500```