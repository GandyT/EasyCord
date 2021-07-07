const Guild = require("../../../classes/discord/Guild");
const Member = require("../../../classes/discord/Member.js");
const User = require("../../../classes/discord/User");
const { default: axios } = require("axios");
const ApiData = require("../../../../meta/api.json");

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

            client.members.push(new Member(member));
        });

        eventData.d.emojis.forEach(emoji => {
            client.emojis.push(emoji);
        });

        console.log(`${guild.name} has ${eventData.d.members.length} members`)

        client.guilds.push(guild);
    }
}