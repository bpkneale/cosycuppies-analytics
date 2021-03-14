
let globalEvent;

const response = (code, jsonBody) => {
    if(code !== 200) {
        console.error({globalEvent})
    }
    return {
        statusCode: code,
        body: jsonBody
    }
}

// lambda function call
exports.handler = async function(event) {
    globalEvent = event;
    const bunyan = require('bunyan');
    const log = bunyan.createLogger({name: "cosycuppies-analytics"});

    let parsed = null;
    try {
        if(typeof event.body === "string") {
            parsed = JSON.parse(event.body);
        } else if(typeof event.payload === "object") {
            parsed = event.payload;
        } else {
            throw new Error("Unable to decode request");
        }
    }
    catch(err) {
        console.error(err);
        return response(400, {success: false, status: "Unable to parse request into JSON", extra: err.message})
    }
    
    log.info({event: {...parsed}}, `Analytics event`)

    return response(200, {success: true, length: JSON.stringify(parsed).length});
};
