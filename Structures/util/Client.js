const { Client, Collection } = require('discord.js')
const { readdir, readdirSync } = require('fs')

module.exports = class extends Client {
    constructor(opt) {
        super(opt)
        this.token = opt.token
        this.developers = opt.developers
        this.prefix = opt.prefix
        this.Discord = require('discord.js')
        this.fs = require('fs')
        this.commands = new Collection()
        this.aliases = new Collection()
    }

    loadCommands(path) {
        readdirSync(path).forEach(dir => {
            const commands = readdirSync(`${path}/${dir}/`).filter(file => file.endsWith(".js"));
            for (const file of commands) {
                let pull = new (require(`../../${path}/${dir}/${file}`))(this)
                if (pull.name && typeof pull.name == 'string') {
                    this.commands.set(pull.name, pull);
                    console.log(`Comando ${file} carregado com sucesso`);
                } else {
                    console.log(`Erro ao carregar o comando ${file} , está faltando o nome do comando, ou o nome não é uma string`);
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => this.aliases.set(alias, pull.name));
            }
        })
    }

    loadEvents(path) {
        readdir(path, (error, files) => {
            if (error) throw new Error(error)
            let jsFiles = files.filter(a => a.endsWith('.js'))
            for (const evt of jsFiles) {
                let evtName = evt.replace(/.js/g, '')
                let evtFunc = new (require(`../../${path}/${evt}`))(this)
                super.on(evtName, (...args) => evtFunc.run(...args))
                console.log(`Evento ${evtName} carregado com sucesso`)
            }
        })
    }
}