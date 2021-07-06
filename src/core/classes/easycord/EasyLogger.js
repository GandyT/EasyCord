
/* STATIC CLASS */
module.exports = {
    getFormattedTime() {
        var executeDate = new Date();
        return `${executeDate.getHours()}:${executeDate.getMinutes()}:${executeDate.getSeconds()}`;
    },

    info(information) {
        var tag = "EasyCord";
        console.log(
            `[${tag}][INFO]: ${information} (${this.getFormattedTime()})`
        )
    },

    warn(warning) {
        var tag = "EasyCord";
        console.log(
            `[${tag}][WARN]: ${warning} (${this.getFormattedTime()})`
        );
    },

    error(error) {
        var tag = "EasyCord";
        throw new Error(
            `[${tag}][FATAL]: ${error} (${this.getFormattedTime()})`
        )
    }
}