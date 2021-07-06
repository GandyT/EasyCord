/* OPERATIONS */
const login = require("./operations/login.js");
const EventManager = require("./events/EventManager.js");

class Client {
    constructor(token) {
        this.token = token;
        this.connection = undefined;
        this._guilds = [];
        this.privileged = false;
        this.eventManager = new EventManager(this);
    }

    login() {
        login(this);
    }
}

module.exports = Client;