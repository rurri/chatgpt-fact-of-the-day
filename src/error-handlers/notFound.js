async function notFound(apiContext, event, lambdaContext) {
  lambdaContext.logger.warn('Not Found (404)', {
    path: event.path,
    method: event.httpMethod,
    ipAddress: lambdaContext.ipAddress
  });
  return {
    statusCode: 404,
    body: JSON.stringify({message: '404 Not Found', details: 'No matching endpoint. 404'}),
  }
}

module.exports = notFound;
