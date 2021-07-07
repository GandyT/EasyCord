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
        console.log(this._client.members.length);
        return this._client.members.filter(m => m.guild.id == this.id);
    }

    get channels() {
        return this._client.channels.filter(c => c.guild.id == this.id);
    }

    get roles() {
        return this._client.roles.filter(r => r.guild.id == this.id);
    }

    get emojis() {
        return this._client.emojis.filter(e => e.guild.id == this.id);
    }
}

module.exports = Guild;