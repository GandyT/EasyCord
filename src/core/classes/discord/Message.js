const { default: axios } = require("axios");
const ApiData = require("../../../meta/api.json");
const EasyEmbed = require("../easycord/EasyEmbed.js");
const Limits = require("../../../meta/limits.json");

class Message {
    constructor(messageData, client) {
        this.client = client;

        this.guild = messageData.guild;
        this.author = messageData.author;
        this.member = messageData.member;
        this.id = messageData.id;
        this.embeds = messageData.embeds;
        this.channel = messageData.channel_id; // replace this with channel wrapper later
        this.content = messageData.content;
        this.attachments = messageData.attachments;
        this.mentions = {
            members: messageData.mentions,
            roles: messageData.mention_roles
        };
        this.createdAt = messageData.timestamp;
        this.tts = messageData.tts;
        this.edited = false;
    }
    edit(content) {
        if (this.client.user.id != this.author.id) {
            this.client.LOGGER.warn("Client cannot edit another user's messages");
            return;
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

        /* CHANGE ${self.channel} to ${self.channel.id} after creating channel wrapper*/

        var self = this;
        return new Promise((res, rej) => {
            (function edit() {
                axios.patch(
                    `${ApiData.endpoint}/channels/${self.channel}/messages/${self.id}`,
                    body,
                    self.client.getAuth()
                )
                    .then(msgData => {
                        if (msgData.retry_after) {
                            setTimeout(() => edit(), msgData.retry_after);
                            return;
                        }

                        if (msgData.message) EasyLogger.error(Response.message);

                        /* UPDATE DATA */
                        self.guild = msgData.data.guild;
                        self.author = msgData.data.author;
                        self.member = msgData.data.member;
                        self.id = msgData.data.id;
                        self.embeds = msgData.data.embeds;
                        self.channel = msgData.data.channel_id; // replace with channel wrapper later
                        self.content = msgData.data.content;
                        self.attachments = msgData.data.attachments;
                        self.mentions = {
                            members: msgData.data.mentions,
                            roles: msgData.data.mention_roles
                        };
                        self.createdAt = msgData.data.timestamp;
                        self.tts = msgData.data.tts;
                        self.edited = true;

                        res(self);
                    });
            })();
        })


    }
    async delete() {

    }
}

module.exports = Message;