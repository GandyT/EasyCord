const Message = require("../../../classes/discord/Message.js");
const User = require("../../../classes/discord/User.js");

/* 
    HERE DOES THE STORING TO CACHE
*/

module.exports = {
    name: "MESSAGE_CREATE",
    execute(messageData, client, lock) {
        /* INCASE THERE IS A DM CHANNEL */
        if (messageData.d.guild_id) {
            messageData.d.guild = client.guilds.find(g => g.id == messageData.d.guild_id);
            messageData.d.member = client.members.find(m => m.id == messageData.d.author.id && m.guild.id == messageData.d.guild_id);
        } else {
            messageData.d.guild = {};
            messageData.d.member = {};
        }
        var author = client.users.find(u => u.id == messageData.d.author.id);

        if (!author) {
            author = new User(messageData.d.author);
            client.users.push(author);
        }
        messageData.d.author = author;

        var messageWrapper = new Message(messageData.d, client);

        client.messages.push(messageWrapper);

        if (lock) lock.unlock();
    }
}