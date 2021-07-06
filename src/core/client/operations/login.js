const ApiData = require("../../../meta/api.json");
const payload = require("./payload.js");
const WS = require("ws");
const { default: axios } = require("axios");

const login = async (client) => {
    var gatewayData = await axios.get(`${ApiData.endpoint}/gateway`);

    client.connection = new WS(`${gatewayData.data.url}/?v=${ApiData.version}&encoding=json`);

    /* DEBUG */
    client.connection.on("open", () => {
        console.log("CONNECTION SUCCESSFUL!");
    });
    /* ===== */
    client.connection.on("message", (data) => {
        payload(data, client);
    });

    client.connection.on("close", (code, reason) => {
        /* 
            RESUME LOGIC HERE
        */

        console.log(`${code} : ${reason}`);
    });
}

module.exports = login;