const EventType = require("./EventType.js");
const Fs = require("fs");

class EventManager {
    constructor(client) {
        this.client = client;
        this.setupEvents = {};
        this.subscribeEvents = {};
        this.easyEvents = {};
        this.dataWrappers = {};

        /* OFFICIAL EVENTDATA WRAPPERS */
        var implFiles = Fs.readdirSync(`${__dirname}/impl`);
        implFiles.forEach(file => {
            if (!file.endsWith(".js")) return;

            var handleData = require(`./impl/${file}`);

            this.dataWrappers[EventType.getName(handleData.name)] = handleData.parse;
        });

        var setupFiles = Fs.readdirSync(`${__dirname}/setup`);
        setupFiles.forEach(file => {
            if (!file.endsWith(".js")) return;

            var setupData = require(`./setup/${file}`);

            this.setupEvents[EventType.getName(setupData.name)] = setupData.execute;
        });

        var easyFiles = Fs.readdirSync(`${__dirname}/easycord`);
        easyFiles.forEach(file => {
            if (!file.endsWith(".js")) return;

            var easyData = require(`./easycord/${file}`);

            this.easyEvents[EventType.getName(easyData.name)] = easyData.execute;
        });


    }

    onReceive(eventData) {
        var eventName = EventType.getName(eventData.t);

        console.log(eventName);

        if (this.easyEvents[eventName]) this.easyEvents[eventName](eventData, this.client);

        if (!this.client.ready) {
            if (this.setupEvents[eventName]) this.setupEvents[eventName](eventData, this.client);
            return;
        }

        /* DON'T WANT TO CALL THE READY EVENT TWICE FOR THE API */
        if (this.eventName == "ready") {
            if (this.client.started) {
                return;
            } else {
                this.client.started = true;
            }
        }

        if (this.subscribeEvents[eventName]) {

            var emitData = eventData.d;

            if (this.dataWrappers[eventName]) {
                emitData = this.dataWrappers[eventName](emitData);
            }

            this.subscribeEvents[eventName].forEach(callback => {
                /* ADD UNIQUE COMPONENTS */
                var eventData = {};
                eventData.getHookReference = () => { return callback };
                eventData.getClient = () => { return this.client }
                eventData.getExecuteTime = () => { return new Date().getTime() }

                if (emitData instanceof Array) {
                    /* LETS DATA WRAPPER PASS MULTIPLE ARGS */
                    callback(eventData, ...emitData);
                } else {
                    callback(eventData, emitData);
                }
            });
        }
    }

    subscribe(event, hook) {
        if (!this.subscribeEvents[event]) this.subscribeEvents[event] = [];

        this.subscribeEvents[event].push(hook);

        return {
            getHookReference: () => { return hook }
        }
    }

    unsubscribe(hook) {
        let foundFlag = false;

        for (let eventName of Object.keys(this.subscribeEvents)) {
            if (foundFlag) break;

            this.subscribeEvents[eventName] = this.subscribeEvents[eventName].filter(f => {
                if (foundFlag) return true;

                if (f == hook) {
                    foundFlag = true;
                    return false;
                }

                return true;
            });
        }

        /* Might want to make a logger */
        if (!foundFlag) console.log("WARN: hook was not found")
    }
}

module.exports = EventManager;