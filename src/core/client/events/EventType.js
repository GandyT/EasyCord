/* BASICALLY AN ENUM */
// default is just camelcase without underscores
module.exports = {
    "GUILD_CREATE": "",
    "GUILD_UPDATE": "",
    "GUILD_DELETE": "",
    "GUILD_ROLE_CREATE": "roleCreate",
    "GUILD_ROLE_UPDATE": "roleUpdate",
    "GUILD_ROLE_DELETE": "roleDelete",
    "CHANNEL_CREATE": "",
    "CHANNEL_UPDATE": "",
    "CHANNEL_DELETE": "",
    "CHANNEL_PINS_UPDATE": "",
    "THREAD_CREATE": "",
    "THREAD_UPDATE": "",
    "THREAD_DELETE": "",
    "THREAD_LIST_SYNC": "",
    "THREAD_MEMBER_UPDATE": "",
    "THREAD_MEMBERS_UPDATE": "",
    "STAGE_INSTANCE_CREATE": "",
    "STAGE_INSTANCE_UPDATE": "",
    "STAGE_INSTANCE_DELETE": "",
    "GUILD_MEMBER_ADD": "",
    "GUILD_MEMBER_UPDATE": "",
    "GUILD_MEMBER_REMOVE": "",
    "THREAD_MEMBERS_UPDATE": "",
    "GUILD_BAN_ADD": "guildMemberBan",
    "GUILD_BAN_REMOVE": "guildMemberUnban",
    "GUILD_EMOJIS_UPDATE": "",
    "GUILD_INTEGRATIONS_UPDATE": "",
    "INTEGRATION_CREATE": "",
    "INTEGRATION_UPDATE": "",
    "INTEGRATION_DELETE": "",
    "WEBHOOKS_UPDATE": "",
    "INVITE_CREATE": "",
    "INVITE_DELETE": "",
    "VOICE_STATE_UPDATE": "",
    "PRESENCE_UPDATE": "",
    "MESSAGE_CREATE": "message",
    "MESSAGE_UPDATE": "messageEdit",
    "MESSAGE_DELETE": "messageDelete",
    "CHANNEL_PINS_UPDATE": "",
    "MESSAGE_REACTION_ADD": "",
    "MESSAGE_REACTION_REMOVE": "",
    "MESSAGE_REACTION_REMOVE_ALL": "",
    "MESSAGE_REACTION_REMOVE_EMOJI": "",
    "TYPING_START": "",
    getName(event) {
        if (this[event]) return this[event];

        return event
            .toLowerCase()
            .split("_")
            .map((e, i) => {
                if (i > 0) {
                    return e[0].toUpperCase() + e.slice(1);
                } else {
                    return e;
                }
            })
            .join("");
    }
}