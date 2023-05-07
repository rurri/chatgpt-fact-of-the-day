async function validationFail(apiContext, event, lambdaContext) {
  lambdaContext.logger.warn('Failed Request Validation', { requestBody: event.body, requestHeaders: event.headers });
  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Failed Request Validation (Client Side) - 400', details: apiContext.validation.errors}),
  }
}

module.exports = validationFail;
