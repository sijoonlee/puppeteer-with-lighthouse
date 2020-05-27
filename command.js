#!/usr/bin/env node

const fs = require('fs')
const {Command, flags} = require('@oclif/command')

class CustomCommand extends Command {
  async run() {
    const {flags} = this.parse(CustomCommand)
    await require('./runLighthouse').run(flags.addr);
  }
}

CustomCommand.flags = {
  version: flags.version(),
  help: flags.help(),
  // run with --dir= or -d=
  addr: flags.string({
    char: 'a',
    default: 'http://ratehub.ca',
  }),
}

CustomCommand.run()
.catch(require('@oclif/errors/handle'))