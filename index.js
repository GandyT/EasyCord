const Client = require("./src/core/client/Client.js");
const EasyEmbed = require("./src/core/classes/easycord/EasyEmbed.js");

module.exports = {
    Client: Client,
    EasyEmbed: EasyEmbed
}

/* TESTING */

const test = require("./test/test.js");

test();