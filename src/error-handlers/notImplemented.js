async function notImplemented(apiContext, event, lambdaContext) {
  lambdaContext.logger.warn('Not Implemented (501)', { path: event.path,  method: event.httpMethod, ipAddress: lambdaContext.ipAddress });
  return {
    statusCode: 501,
    body: JSON.stringify({ message: 'Not Yet Implemented (Server Side) - 501' ,details: 'this endpoint not implemented sever side' }),
  }

}

module.exports = notImplemented;
