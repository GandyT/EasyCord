const { default: axios } = require("axios");
const EasyLogger = require("../easycord/EasyLogger.js");
const EasyEmbed = require("../easycord/EasyEmbed.js");
const ApiData = require("../../../meta/api.json");
const Limits = require("../../../meta/limits.json");

/* HOPEFULLY I DON'T ACCIDENTALLY CREATE A CIRCULAR DEPENDENCY */
const Message = require("../../classes/discord/Message.js");

class User {
    constructor(userData, client) {
        this.client = client;
        this.username = userData.username;
        this.id = userData.id;
        this.discriminator = userData.discriminator;
        this.bot = userData.bot;
        this.avatarURL = userData.avatar;
        this.tag = this.username + "#" + this.discriminator;
        this.dm;
    }

    get mention() {
        return `<@${this.id}>`
    }

    send(content) {
        if (!content) {
            EasyLogger.warn("cannot send empty message");
            return;
        }

        if (this.client.user.id == this.id) {
            EasyLogger.warn("cannot send message to client.");
            return;
        }

        return new Promise(async (res, rej) => {
            /* CACHING DM CHANNEL */
            var dm;
            if (this.dm) {
                dm = this.dm;
            } else {
                dm = await axios.post(`${ApiData.endpoint}/users/@me/channels`, { 'recipient_id': this.id }, this.client.getAuth());
                this.dm = dm;
            }

            var body = {
                content: content,
                tts: false,
                embed: {},
                components: [] // new discord feature (ex: buttons)
            }

            /* VAR CASES */
            if (!content.embed) {
                body.content = String(content);

                if (body.content.length > Limits.maxCharacters) {
                    EasyLogger.warn(`Cannot send a message over ${Limits.maxCharacters} characters long`);
                    return;
                }
            } else {
                body.content = "";

                if (content instanceof EasyEmbed) {
                    // instance of custom embed builder
                    body.embed = content.getEmbed();
                } else {
                    body.embed = content;
                }
            }

            const self = this;

            (function post() {
                /* SEND LOGIC */
                axios.post(`${ApiData.endpoint}/channels/${dm.data.id}/messages`, body, self.client.getAuth())
                    .then(msgData => {
                        // rate-limited
                        if (msgData.retry_after) {
                            setTimeout(() => post(), msgData.retry_after);
                            return;
                        }

                        if (msgData.message) EasyLogger.error(Response.message);

                        /* DONE: ~~IMPORTANT: create a message wrapper later~~ */
                        var message = new Message(msgData.data, self.client);
                        self.client.messages.push(message);
                        res(message);
                    })
            })();
        })
    }
}

module.exports = User;