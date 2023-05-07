const fs = require('fs');
module.exports.handler = (event, context, callback) => {
    callback(null, {
        statusCode: 200,
        body: fs.readFileSync('public/.well-known/ai-plugin.json').toString(),
    });
};
