class Logger {
    constructor(client) {
        this.client = client;
    }

    getFormattedTime() {
        var executeDate = new Date();
        return `${executeDate.getHours()}:${executeDate.getMinutes()}:${executeDate.getSeconds()}`;
    }

    info(information) {
        var tag = this.client.user ? this.client.user.tag : "LOADING";
        console.log(
            `[${tag}][INFO]: ${information} (${this.getFormattedTime()})`
        )
    }

    warn(warning) {
        var tag = this.client.user ? this.client.user.tag : "LOADING";
        console.log(
            `[${tag}][WARN]: ${warning} (${this.getFormattedTime()})`
        );
    }

    error(error) {
        var tag = this.client.user ? this.client.user.tag : "LOADING";
        throw new Error(
            `[${tag}][FATAL]: ${error} (${this.getFormattedTime()})`
        )
    }
}

module.exports = Logger;