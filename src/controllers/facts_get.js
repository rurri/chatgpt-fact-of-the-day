const fs = require('fs');
module.exports = async (apiContext, event, lambdaContext) => {
  const logger = lambdaContext.logger;
  logger.info('facts_get', { path: event.path,  method: event.httpMethod, ipAddress: lambdaContext.ipAddress });
  // Load in ../../fixtures/facts.txt which is a text file containing one fact per line, and split on carriage return
  let facts = fs.readFileSync('fixtures/facts.txt', 'utf8').split('\n');
  const filterWord = event?.queryStringParameters?.filter_word ?? null;
  if (filterWord && filterWord.length > 0) {
    // Filter facts such that it only contains facts with the filter word
    facts = facts.filter(fact => fact.toLowerCase().includes(filterWord.toLowerCase()));
  }
  // Split facts by carriage return and grab a random line for a fact

  return ({
    statusCode: 200,
    body: { fact: facts[Math.floor(Math.random() * facts.length)] }
  })
};
