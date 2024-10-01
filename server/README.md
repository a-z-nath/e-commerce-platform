# Project Title

A brief description of what this project does and who it's for

## API Reference

### User End points

#### Register a user

```http
  POST /api/v1/users/register
```

#### Sign in a user

```http
  POST /api/v1/users/signin
```

#### Sign out a logged in user

```http
  POST /api/v1/users/signin
```

#### Register a user

```http
  POST /api/v1/users/register
```

#### Sign in a user

```http
  POST /api/v1/users/signin
```

#### Sign out a logged in user

```http
  POST /api/v1/users/signin
```

#### Refresh Access Token

```http
  POST /api/v1/users/refresh-token
```

#### Change Password

```http
  PATCH /api/v1/users/change-password
```

#### Update Account Details

```http
  PATCH /api/v1/users/update-account
```

#### Get a user by user ID

```http
  GET /api/v1/users/:userId
```

#### Delete User by its ID

```http
  DELETE /api/v1/users/:userId
```

#### Fetch All User

```
This end points take request query the parameters are `page`, `perPage`, & `sort`
```

```http
  GET /api/v1/users/
```

#### Change User Avatar/Profile image

```http
  PATCH /api/v1/users/avatar
```

### Category End points

#### Fetch all categories

```http
  GET /api/v1/categories
```

#### Add a Category

```http
  PATCH /api/v1/categories/add
```

#### Fetch category by its ID

```http
  GET /api/v1/categories/:categoryId
```

### Product End points

#### Add Products

```http
  POST /api/v1/products/add
```

#### Fetch All Products

```
This end points take request query the parameters are `name`, `type`, `page`, `perPage`, & `sort`
```

```http
  GET /api/v1/products
```

#### Fetch product by its ID

```http
  PATCH /api/v1/products/:productId
```
