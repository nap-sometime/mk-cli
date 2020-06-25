import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
	name: 'mk-cli',
	run: async toolbox => {
		const { print } = toolbox

		print.info(`Usage: mk-cli <command> [options]

Options:
  -V, --version                              output the version number
  -h, --help                                 output usage information

Commands:
  add [options] <app-name>     create a new project
  `)
	}
}

module.exports = command
