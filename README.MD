# Serverless / Open API Scaffold

This is a scaffold for a serverless project that uses Open API for documentation and validation.

## Getting Started
Modify the `open-api.yml` file to add your API endpoints. When adding an endpoint. Add the handler function name in the open-api.yml file under the operationId property.  

The handler function should then be placed in the `src/controllers` folder, and should export a single function that takes three parameters, `context`, `event`, and `lambdaContext`. The function should return a promise that resolves to an object with the following properties:

An example handler would look like:
```javascript
module.exports = async (apiContext, event, lambdaContext) => {
    return ({
        statusCode: 200,
        body: { hello: event.queryStringParameters.greeting }
    })
};
```

### Lambda Context
The lambda context is setup in the `src/lambdas/openapi-backend-handler.js` file.
Database handles, loggers, and other items common to all handlers can be added to the lambda context to be available to all handlers.

By default, a Winston logger is added to the lambda context. The logger can be accessed in a handler by calling `lambdaContext.logger`.

Some items commonly added to the lambda context:
 - Database Handles
 - Logger
 - Request Id
 - User Id
 - Environment Variables
 - etc.

### Error Handling

Default Error Handlers are already created in `src/error-handlers`. These can be modified to fit your needs.

### Post Processing Hook
Currently, the post-processing hook checks to make sure the response from the handler matches the openAPI schema. 
If it does not, it will throw a 502 error. This helps insure that the openAPI schema is always up to date with the code.

### Default Logger
A default Winston logger is setup on the lambda context. This can be accessed in a handler by calling `lambdaContext.logger`.
This logger by default creates a request id and logs all messages with the request Id. This can help with searching logs for a specific request.

If the client wishes to provide a request Id, this can be set in the header `X-Request-Id`. The logger will then use this request id instead of creating a new one.

## Hackolade
Hackolade is a tool that can be used to create the openAPI schema. It can be downloaded from [here](https://hackolade.com/).
Hackolade was used to create the sample openAPI schema in this project. The schema can be found in the `open-api.yml` file.
The Hackolade source can be found in the `hackolade` folder. Hackloade is NOT required to be used to create the openAPI schema, but you may find it useful.
If the open-api.yml file is modified by hand (instead of by hackolade), I recommend deleting the hackolade folder to prevent confusion.

## Serverless Framework
This project does NOT expect the serverless framework to be installed globally. Instead a specific version is installed as a dev dependency.
This allows the project to be built and deployed using the same version of the serverless framework, and to avoid conflicts with other projects.

## Running Locally
To run locally, run `npm install` to install all dependencies. Then run `npm run start` to start the serverless offline server.

## CORS
No CORS headers are added by default. A couple good places to add CORS headers are:
 - In the notImplemented handler in the event an OPTIONS is received
 - In the openapi-backend-handler.js file
 - In the error handlers

## Testing
A bunch of sample http requests are located in http-requests. These can be run directly for a Jetbrains product or imported into Postman.

## Basic remote logs
You can view basic remote logs with the sls command `npm run sls -- logs --function api` (Option `--tail` to follow logs)

## SLS Commands
Because serverless is installed as a local module and we don't use the global serverless to avoid conflicts and to lock our sls version to our project as a best practice,
you may find it easier to run sls commands using the npm run sls command. For example, to deploy, you can run `npm run sls -- deploy`

## VPC Setup
Want your lambda to run in a VPC? Uncomment out the line:
`vpc: ${file(./cfn/serverless-vpc.yml)}`
Further, want a jumpbox? Uncomment out the EC2 launch template and the jumpbox security group in the serverless-vpc.yml file.
Lastly uncomment out the vpc config in the servlerss-function.yml file.
