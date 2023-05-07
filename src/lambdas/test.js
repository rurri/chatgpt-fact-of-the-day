module.exports.handler = (event, context, callback) => {
    console.log('Test Function Invoked');
    console.log(JSON.stringify(event));
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({event}),
    });
};
