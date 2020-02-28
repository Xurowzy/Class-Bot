module.exports = class {
    constructor(client) {
        this.client = client
    }

    run() {
        this.client.user.setPresence({ game: { name: "https://github.com/xurowzy", type: 1, url: "https://www.twitch.tv/xurowzy" } })
        console.log('Bot online')
    }
}