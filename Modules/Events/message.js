module.exports = class {
    constructor(client) {
        this.client = client
    }

    run(message) {
        if (message.author.bot) return
        if (message.channel.type == "dm") return

        let prefix = this.client.prefix

        const args = message.content.slice(prefix.length).trim().split(/\s+/g)
        const cmd = args.shift().toLowerCase()

        let command = this.client.commands.get(cmd)
        if (!command) command = this.client.commands.get(this.client.aliases.get(cmd))
        if (command) {
            command.run({ message, args })
        }
    }
}