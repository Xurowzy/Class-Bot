module.exports = class {
    constructor(client) {
        this.name = 'ping'
        this.aliases = ['botping']
        this.client = client
    }

    run({message, args}) {
        message.channel.send('Ping?').then((m) => {
          let websocket = m.createdAt - message.createdAt
          let ping = Math.round(this.client.ping)
          m.edit(`Pong!\nWebSocket: ${websocket}\nPing: ${ping}`)
        })
    }
}

