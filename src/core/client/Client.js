/* OPERATIONS */
const login = require("./operations/login.js");
const EventManager = require("./events/EventManager.js");

const Logger = require("./Logger.js");

class Client {
    constructor(token) {

        /* CLIENT LOGIC DATA */
        this.token = token;
        this.connection = undefined;
        this.sessionId = undefined;
        this.privileged = false;
        this.eventManager = new EventManager(this);
        this.reconnecting = false;
        this.ready = false;
        this.seq = null;
        this.started = false;

        /* CACHE */
        this.guilds = [];
        this.members = [];
        this.channels = [];
        this.roles = [];
        this.users = [];

        /* CLIENT-USER-INFO */
        this.LOGGER = new Logger(this);
        this.user = null;
    }

    login() {
        login(this);
    }

    getAuth() {
        return {
            headers: {
                "authorization": `Bot ${this.token}`
            }
        };
    }
}

module.exports = Client;