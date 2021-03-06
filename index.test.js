const { handler } = require("./index");
const { expect } = require("chai");

describe("Lambda tests", () => {

    it("Should handle well formed packet", async () => {

        const event = {
            httpMethod: "POST",
            body: JSON.stringify({
                uuid: "a persons uuid",
                data: "looked at website"
            })
        }

        const resp = await handler(event)

        console.info({resp})

        expect(resp.statusCode).to.eq(200);

    })

    it("Should handle badly formed packet", async () => {

        const event = {
        }

        const resp = await handler(event)

        console.info({resp})

        expect(resp.statusCode).to.eq(400);

    })
})