const Guild = require("../../../classes/discord/Guild");
const Member = require("../../../classes/discord/Member.js");
const User = require("../../../classes/discord/User");
const Role = require("../../../classes/discord/Role.js");
const { default: axios } = require("axios");
const ApiData = require("../../../../meta/api.json");

module.exports = {
    name: "GUILD_CREATE",
    async execute(eventData, client, lock) {
        var guild = new Guild(eventData.d, client);

        var roleData = await axios.get(`${ApiData.endpoint}/guilds/${guild.id}/roles`, client.getAuth());

        roleData.data.forEach(role => {
            role.guild = guild;
            client.roles.push(new Role(role));
        })

        eventData.d.members.forEach(member => {
            member.guild = guild;
            member.user = new User(member.user, client);

            if (!client.users.find(u => u.id == member.user.id)) client.users.push(member.user);

            client.members.push(new Member(member, client));
        });

        eventData.d.emojis.forEach(emoji => {
            client.emojis.push(emoji);
        });

        client.guilds.push(guild);

        if (lock) lock.unlock();
    }
}