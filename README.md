## Project setup

```bash
$ npm install
```

```bash
$ docker-compose up
```

```bash
$ npm run migration:run
```

## Seed database
```bash
$ npm run seed:products
```

## Swagger documenation
    localhost:3100/swagger

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


```
Test application (CRM for a store)
Features:
-Adding and editing new users
-Adding new products
-Adding a product to the cart for each user
-Creating an order
-Changing the order status
-Get orders, users, products, carts
```

## Postman 

<details> <summary>Requests</summary>
{
	"info": {
		"_postman_id": "7c1fff03-6e47-4727-a20b-9fc50bbfe4a2",
		"name": "shop",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "16080540"
	},
	"item": [
		{
			"name": "USER",
			"item": [
				{
					"name": "create user",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"email\": \"testUser@gmail.com\",\r\n    \"password\": \"1234567123\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3100/api/users",
							"host": [
								"localhost"
							],
							"port": "3100",
							"path": [
								"api",
								"users"
							]
						}
					},
					"response": []
				},
				{
					"name": "update user by id",
					"request": {
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"email\": \"testUser1@gmail.com\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3100/api/users/2",
							"host": [
								"localhost"
							],
							"port": "3100",
							"path": [
								"api",
								"users",
								"2"
							]
						}
					},
					"response": []
				},
				{
					"name": "get user",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"email\": \"testUser@gmail.com\",\r\n    \"password\": \"1234567123\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3100/api/users/2",
							"host": [
								"localhost"
							],
							"port": "3100",
							"path": [
								"api",
								"users",
								"2"
							]
						}
					},
					"response": []
				},
				{
					"name": "get users",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"email\": \"testUser@gmail.com\",\r\n    \"password\": \"1234567123\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3100/api/users",
							"host": [
								"localhost"
							],
							"port": "3100",
							"path": [
								"api",
								"users"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "PRODUCT",
			"item": [
				{
					"name": "create product",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\": \"test\",\r\n    \"price\": 10.00\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3100/api/products",
							"host": [
								"localhost"
							],
							"port": "3100",
							"path": [
								"api",
								"products"
							]
						}
					},
					"response": []
				},
				{
					"name": "get product by id",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\": \"test\",\r\n    \"price\": 10.00\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3100/api/products/5",
							"host": [
								"localhost"
							],
							"port": "3100",
							"path": [
								"api",
								"products",
								"5"
							]
						}
					},
					"response": []
				},
				{
					"name": "get products",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\": \"test\",\r\n    \"price\": 10.00\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3100/api/products?limit=5&minPrice=200&maxPrice=230&isAvailable=true&sort=DESC&orderBy=price",
							"host": [
								"localhost"
							],
							"port": "3100",
							"path": [
								"api",
								"products"
							],
							"query": [
								{
									"key": "limit",
									"value": "5"
								},
								{
									"key": "name",
									"value": "Pizza",
									"disabled": true
								},
								{
									"key": "description",
									"value": "Salad",
									"disabled": true
								},
								{
									"key": "minPrice",
									"value": "200"
								},
								{
									"key": "maxPrice",
									"value": "230"
								},
								{
									"key": "isAvailable",
									"value": "true"
								},
								{
									"key": "sort",
									"value": "DESC"
								},
								{
									"key": "orderBy",
									"value": "price"
								}
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "CART",
			"item": [
				{
					"name": "add to cart",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "delete item in cart",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "localhost:3100/api/cart/1/1",
							"host": [
								"localhost"
							],
							"port": "3100",
							"path": [
								"api",
								"cart",
								"1",
								"1"
							]
						}
					},
					"response": []
				},
				{
					"name": "patch item in cart",
					"request": {
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"productId\": 1,\r\n    \"userId\": 1,\r\n    \"quantity\": 10\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3100/api/cart",
							"host": [
								"localhost"
							],
							"port": "3100",
							"path": [
								"api",
								"cart"
							]
						}
					},
					"response": []
				},
				{
					"name": "get cart",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				}
			]
		},
		{
			"name": "ORDER",
			"item": [
				{
					"name": "create order",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "localhost:3100/api/orders/10",
							"host": [
								"localhost"
							],
							"port": "3100",
							"path": [
								"api",
								"orders",
								"10"
							]
						}
					},
					"response": []
				},
				{
					"name": "update order",
					"request": {
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"status\": \"DELIVERED \"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3100/api/orders/1",
							"host": [
								"localhost"
							],
							"port": "3100",
							"path": [
								"api",
								"orders",
								"1"
							]
						}
					},
					"response": []
				},
				{
					"name": "get order by userId",
					"request": {
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"status\": \"DELIVERED \"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3100/api/orders/1",
							"host": [
								"localhost"
							],
							"port": "3100",
							"path": [
								"api",
								"orders",
								"1"
							]
						}
					},
					"response": []
				}
			]
		}
	]
}
</details>