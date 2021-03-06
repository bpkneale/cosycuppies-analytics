
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
        return response(400, {success: false, status: "Unable to parse request into JSON", extra: err.message})
    }
    
    console.info({parsed})

    return response(200, {success: true, length: JSON.stringify(parsed).length});
};
