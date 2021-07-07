class Message {
    constructor(messageData) {
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
    }
    edit(content) {

    }
    delete(opts = { timeout: 0 }) {

    }
    react() {

    }
}

module.exports = Message;