const ApiData = require("../../../meta/api.json");
const payload = require("../websocket/payload.js");
const close = require("../websocket/close.js");
const WS = require("ws");
const { default: axios } = require("axios");
var gateway = null;

const login = async (client) => {
    var gatewayData;

    if (gateway) {
        gatewayData = gateway;
    } else {
        gatewayData = await axios.get(`${ApiData.endpoint}/gateway`);
        gateway = gatewayData;
    }

    client.connection = new WS(`${gatewayData.data.url}/?v=${ApiData.version}&encoding=json`);

    client.connection.on("message", payload.bind(client));

    client.connection.on("close", close.bind(client));
}

module.exports = login;