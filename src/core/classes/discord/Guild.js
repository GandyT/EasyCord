class Guild {
    constructor(guildData, client) {
        // reference to the client
        this._client = client;

        this.name = guildData.name;
        this.size = guildData.mebmer_count;
        this.nsfw = guildData.nsfw;
        this.id = guildData.id;
        this.ownerId = guildData.owner_id;
        this.vanityUrl = guildData.vanity_url_code
        this.description = guildData.description;
        this.threads = guildData.threads;
        this.voiceStates = guildData.voice_states;
        this.region = guildData.region;
    }

    get members() {
        return this._client.members.filter(m => m.guild.id == this.id);
    }

    get channels() {
        return this._client.channels;
    }

    get roles() {
        return this._client.roles;
    }

    get emojis() {
        return this._client.emojis;
    }
}

module.exports = Guild;