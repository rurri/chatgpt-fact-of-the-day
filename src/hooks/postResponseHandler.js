
async function postResponseHandler(apiContext, event, lambdaContext) {
  const body = apiContext?.response?.body ?? null;
  const headers = { ...apiContext.response.headers, 'x-request-id': lambdaContext.requestId };
  const statusCode = apiContext.response.statusCode;
  if (statusCode && statusCode < 400 && event.httpMethod !== 'OPTIONS') {
    const isValidBody = apiContext.api.validateResponse(body, apiContext.operation, apiContext.response.statusCode);
    const isValidHeaders = apiContext.api.validateResponseHeaders(headers, apiContext.operation, {
      statusCode: apiContext.response.statusCode,
      setMatchType: 'superset',
    });

    if (isValidHeaders.errors || isValidBody.errors) {
      lambdaContext.logger.error('Failed Response Validation', {
        responseBody: body,
        responseHeaders: headers
      });
      return {
        statusCode: 502,
        body: JSON.stringify({ message: 'Failed Response Validation (Server side) - 502', details: isValidHeaders.errors || isValidBody.errors }),
        headers,
      }
    }
  }
  return {
    ...apiContext.response,
    headers,
    body: (typeof body === 'object' && body !== null) ? JSON.stringify(body) : body
  };}

module.exports = postResponseHandler;
