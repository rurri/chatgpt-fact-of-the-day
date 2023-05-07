async function methodNotAllowed(apiContext, event, lambdaContext) {
  if (event.httpMethod === 'OPTIONS') {
    lambdaContext.logger.warn('Preflight', { path: event.path,  method: event.httpMethod, ipAddress: lambdaContext.ipAddress });
    return {
      statusCode: 204,
    }
  }
  lambdaContext.logger.warn('Method Not Allowed (405)', { path: event.path,  method: event.httpMethod, ipAddress: lambdaContext.ipAddress });
  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed (405)' ,details: 'this endpoint does not allow that method' }),
  }
}

module.exports = methodNotAllowed;
