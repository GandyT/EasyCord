class EasyEmbed {
    constructor() {
        this.embed = {}
    }

    getEmbed() {
        return this.embed;
    }

    setTitle(title) {
        this.embed.title = String(title);

        return this;
    }

    setDescription(description) {
        this.embed.description = String(description);

        return this;
    }

    setColor(color) {
        /* TODO: ADD SOME COLOR LOGIC TO ACCEPT MULTIPLE COLOR TYPES */

        this.embed.color = color;

        return this;
    }

    setThumbnail(url) {
        this.embed.thumbnail = { url: String(url) };

        return this;
    }

    setUrl(url) {
        this.embed.url = String(url);

        return this;
    }

    addField(name, value) {
        if (!this.embed.fields) this.embed.fields = [];

        this.embed.fields.push({ name: String(name), value: String(value) });

        return this;
    }

    setImage(url) {
        this.embed.image = {
            url: String(url)
        }

        return this;
    }

    setTimestamp() {
        this.embed.timestamp = new Date();

        return this;
    }

    setFooter(text, iconUrl = "") {
        this.embed.footer = {
            text: String(text),
            icon_url: String(iconUrl)
        }

        return this;
    }
}

module.exports = EasyEmbed;