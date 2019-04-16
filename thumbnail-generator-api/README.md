# PoC: Thumbnail Generator API

API that generates thumbnails from a source image.

## Configuration

The configuration file is located in src/config.json

```js
{
	"ports": {
		"production": 5001, // Port in which the api will run in production mode
		"development": 3001 // Port in which the api will run in development mode
	},
	"use_auth0": false, // Defines if Auth0 (auth0.com) will be used
	"auth0_audience": "https://example.auth0.com/api/v2/", // Auth0 API Audience/Identifier (Auth0 Panel --> APIs --> API to use)
	"auth0_issuer": "https://example.auth0.com/", // Auth0 App Domain (Auth0 Panel --> Application --> Your Application)
	"auth0_keys": "https://example.auth0.com/.well-known/jwks.json", // Auth0 App OAuth JSON Web Key Set Endpoint (Auth0 Panel --> Application --> Your Application --> Settings --> Advance Settings --> Endpoints --> JSON Web Key Set)
	"supported_img_mimetype": ["image/jpeg", "image/png"] // List of supported source image mime-types
}
```

## Goal

Build a simple

## Requirements

-   The API should provide at least 1 endpoint where the user will be able to POST the original image
-   The API must **ONLY** accept PNG and JPEG files
-   The API must reject input file bigger than **5mb**
-   The API should give the user 3 new images with the following dimensions
    -   400x300
    -   160x120
    -   120x120

## Grading Guidelines

### MVP (40 points)

-   Every requirement is met
-   The solution runs on our enviroment
-   Tech Stack: Node.js >=8 / Python 3
-   Any ENV specific value should be configurable and documented
-   Everything should work after following a simple README
-   The code should be clear and easy to read / debug

### Nice moves (5 points each)

-   It includes **RAML** or **Swagger** documentation
-   It includes configuration files / scripts for deploying it on **AWS** or **GCP**
-   It's serverless! (either **AWS Lambda + API Gateway** or **GCP Cloud Functions**)
-   It relies on **Serverless Framework** or **SAM**
-   It's Dockerized for local development / testing
-   It leverages cloud services (ie: AWS S3, SNS, SQS, etc...)
-   It's asynchronic
-   It's fast (<~500ms after upload finishes)
-   It includes some kind of testing (unit tests, integration tests, etc) with at least 70% coverage
-   It has an auth implementation (recommended: Auth0)

### Wait, WHAT?! (10 points each)

-   It includes a configuration file / script to setup a CI/CD process on AWS or GCP
-   It includes three different kinds of tests (unit, integration and performance)
