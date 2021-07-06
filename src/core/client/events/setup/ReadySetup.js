const User = require("../../../classes/discord/User.js");

module.exports = {
    name: "READY",
    execute(eventData, client) {
        client.user = new User(eventData.d.user, client);
        client.session_id = eventData.session_id;

        new Promise((res, rej) => {
            const readyCheck = () => {
                /* WAIT FOR CACHE TO LOAD */
                if (client.guilds.length == eventData.d.guilds.length) {
                    res();
                }

                setTimeout(() => readyCheck(), 250);
            }

            readyCheck();
        })
            .then(() => {
                client.ready = true;
                client.eventManager.setupEvents = {};
                client.eventManager.onReceive(eventData);
            })
    }
}