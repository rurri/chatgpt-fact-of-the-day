const fs = require('fs');
module.exports.handler = (event, context, callback) => {
    callback(null, {
        statusCode: 200,
        headers: {
            'content-type': 'image/png',
        },
        body: fs.readFileSync('public/bunny-flop-outline.png').toString('base64'),
        isBase64Encoded: true,
    });
};
