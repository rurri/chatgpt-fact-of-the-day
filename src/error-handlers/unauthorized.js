async function unauthorizedHandler(apiContext, event, lambdaContext) {
  lambdaContext.logger.warn('Unauthorized (401)', { path: event.path,  method: event.httpMethod, ipAddress: lambdaContext.ipAddress });
  return {
    statusCode: 401,
    body: JSON.stringify({ message: 'Unauthorized (401)' ,details: 'this endpoint requires authorization' }),
  }
}

module.exports = unauthorizedHandler;
