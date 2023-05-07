const fs = require('fs');
module.exports.handler = (event, context, callback) => {
    callback(null, {
        statusCode: 200,
        headers: {
            'content-type': 'application/x-yaml',
            'access-control-allow-origin': '*',
            'Access-Control-Allow-Headers': 'content-type, authorization',
            'Access-Control-Allow-Methods': '*',
        },
        body: fs.readFileSync('open-api.yaml').toString(),
    });
};
