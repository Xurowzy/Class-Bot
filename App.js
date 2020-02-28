const {Client} = require('./Structures/index')
const client = new Client({
     developers: [],
     token: 'token',
     prefix: 'prefixo'
})
client.loadEvents('./Modules/Events/')
client.loadCommands('./Modules/Commands')
client.login(client.token)