const Guild = require("../../../classes/discord/Guild");
const Member = require("../../../classes/discord/Member.js");
const User = require("../../../classes/discord/User");

module.exports = {
    name: "GUILD_CREATE",
    execute(eventData, client) {
        var guild = new Guild(eventData.d, client);

        eventData.d.channels.forEach(channel => {
            client.channels.push(channel)
        });
        eventData.d.roles.forEach(role => {
            client.roles.push(role);
        })

        eventData.d.members.forEach(member => {
            member.guild = guild;
            member.user = new User(member.user, client);

            if (!client.users.find(u => u.id == member.user.id)) client.users.push(member.user);

            client.members.push(new Member(member));
        });

        eventData.d.emojis.forEach(emoji => {

        });

        client.guilds.push(guild);
    }
}