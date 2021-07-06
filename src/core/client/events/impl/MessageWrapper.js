module.exports = {
    name: "MESSAGE_CREATE",
    parse(messageData) {
        console.log(messageData);
        return messageData;
    }
}