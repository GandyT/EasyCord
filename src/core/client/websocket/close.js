function close(code, reason) {
    var client = this;

    console.log(code);

    client.reconnecting = true;
    client.login();
}

module.exports = close;