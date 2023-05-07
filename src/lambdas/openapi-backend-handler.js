
const uuid = require('uuid');
const winston = require('winston');

const controllers = require('require-all')(`${__dirname}/../controllers`);
const errorHandlers = require('require-all')(`${__dirname}/../error-handlers`);
const hooks = require('require-all')(`${__dirname}/../hooks`);

const OpenAPIBackend = require('openapi-backend').OpenAPIBackend;

const api = new OpenAPIBackend({
    definition: './open-api.yaml',
    strict: false,

});

api.register({
    ...controllers,
    ...errorHandlers,
    ...hooks,
});


// initalize the backend
api.init();

module.exports.handler = async (event, context) => {
    const ipAddress = event?.headers?.['X-Forwarded-For']?.split(',').map(ip => ip.trim())[0];
    const requestId = event?.headers?.['X-Request-Id'] ?? uuid.v4();
    const logger = winston.createLogger({
        level: 'info',
        format: process.env.IS_OFFLINE ? winston.format.combine(winston.format.colorize(), winston.format.simple()) : winston.format.json(),
        defaultMeta: {
            requestId,
        },
        transports: [
            new winston.transports.Console({}),
        ]
    });
    logger.info('Request Received', { path: event.path, method: event.httpMethod, ipAddress, requestBody: event.body, requestQuery: event.queryStringParameters, requestHeaders: event.headers })
    let result = {};
    try {
        result = await api.handleRequest(
            {
                method: event.httpMethod,
                path: event.path.replace('/api', ''),
                query: event.queryStringParameters,
                body: event.body || {},
                headers: event.headers,
            },
            event,
            {...context, requestId, logger, ipAddress},
        );
    } catch (err) {
        logger.error(err);
        result = {
            statusCode: err.responseCode || 502,
            body: JSON.stringify({ details: err.responseCode || 502, message: err.responseCode || 502 }),
        }
    } finally {
        /////////////////////////////
        // Cleanup anything that needs to be cleaned up here. Such as a db handle.
        /////////////////////////////
    }
    const responseLogInfo = { responseCode: result.statusCode, path: event.path, method: event.httpMethod, ipAddress, responseBody: result.body, responseHeaders: result.headers };
    if (result.statusCode !== 200) {
        logger.warn(`Returning Non 200 Response (${result.statusCode})`, responseLogInfo)
    } else {
        logger.info('Returning Response', responseLogInfo)
    }
    return result;
}
