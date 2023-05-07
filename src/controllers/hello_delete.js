module.exports = async (apiContext, event, lambdaContext) => {
  const logger = lambdaContext.logger;
  logger.info('hello_get', {path: event.path, method: event.httpMethod, ipAddress: lambdaContext.ipAddress});
  throw new Error('Expected Exception from hello_delete');
};
