/* 
    HERE DOES THE ACTUAL RETURNING
*/

module.exports = {
    name: "MESSAGE_CREATE",
    async parse(messageData, client, lock) {
        await lock.waitForUnlock();

        return client.messages.find(m => m.id == messageData.id);
    }
}