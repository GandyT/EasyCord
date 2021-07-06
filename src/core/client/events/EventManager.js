const EventType = require("./EventType.js");
const Fs = require("fs");

class EventManager {
    constructor(client) {
        this.client = client;
        this.subscribeEvents = {};
        this.dataWrappers = {};

        /* OFFICIAL EVENTDATA WRAPPERS */
        var implFiles = Fs.readdirSync(`${__dirname}/impl`);
        implFiles.forEach(file => {
            if (!file.endsWith(".js")) return;

            var handleData = require(`./impl/${file}`);

            this.dataWrappers[EventType.getName(handleData.name)] = handleData.parse;
        });
    }

    onReceive(eventData) {
        var eventName = EventType.getName(eventData.t);
        console.log(eventName);
        if (this.subscribeEvents[eventName]) {

            var emitData = eventData.d;

            if (this.dataWrappers[eventName]) {
                emitData = this.dataWrappers[eventName](emitData);
            }

            this.subscribeEvents[eventName].forEach(callback => {
                /* ADD UNIQUE COMPONENTS */
                emitData.getReference = () => { return callback };
                emitData.getExecuteTime = () => { return new Date().getTime() }

                callback(emitData);
            });
        }
    }

    subscribe(event, hook) {
        if (!this.subscribeEvents[event]) this.subscribeEvents[event] = [];

        this.subscribeEvents[event].push(hook);

        return {
            getReference: () => { return hook }
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