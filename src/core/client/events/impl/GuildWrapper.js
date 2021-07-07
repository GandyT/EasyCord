module.exports = {
    name: "GUILD_CREATE",
    async execute(eventData, client, lock) {
        await lock.waitForUnlock();
        return client.guilds.find(g => g.id == eventData.d.id);
    }
}