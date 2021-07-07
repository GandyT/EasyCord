const Message = require("../../../classes/discord/Message.js");
const User = require("../../../classes/discord/User.js");

module.exports = {
    name: "MESSAGE_CREATE",
    parse(messageData, client) {

        /* INCASE THERE IS A DM CHANNEL */
        if (messageData.guild_id) {
            messageData.guild = client.guilds.find(g => g.id == messageData.guild_id);
            messageData.member = client.members.find(m => m.id == messageData.author.id && m.guild.id == messageData.guild_id);
        } else {
            messageData.guild = {};
            messageData.member = {};
        }

        var author = client.users.find(u => u.id == messageData.author.id);

        if (!author) {
            author = new User(messageData.author);
            client.users.push(author);
        }

        messageData.author = author;

        var messageWrapper = new Message(messageData);

        client.messages.push(messageWrapper);

        return messageWrapper;
    }
}