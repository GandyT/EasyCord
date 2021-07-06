const payload = (incoming, client) => {
    var data = JSON.parse(incoming);

    if (data.op == 10) {
        /* GATEWAY HELLO */

        heartbeat(data.d.heartbeat_interval, client.connection);

        let intents = 0;

        for (let i = 0; i <= 14; ++i) {
            /* GRAB ALL INTENTS */

            /* Client does not have permissions to use these intents (v8+)*/
            if ((i == 1 || i == 8) && !client.privileged) continue;

            intents += 1 << i;
        }

        let identify = {
            op: 2,
            d: {
                token: client.token,
                intents: intents,
                properties: {
                    $os: process.platform,
                    $browser: "easycord",
                    $device: "easycord"
                }
            }
        }

        client.connection.send(JSON.stringify(identify))

    } else if (data.op == 0) {

        client.eventManager.onReceive(data);
    } else {
        console.log(data);
    }
}

const heartbeat = (interval, conn) => {
    setTimeout(() => {
        conn.send(
            JSON.stringify({
                op: 1,
                d: null
            })
        );

        heartbeat(interval, conn);
    }, interval);
}

module.exports = payload;