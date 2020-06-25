import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
	name: 'mk-cli',
	run: async toolbox => {
		const { print } = toolbox

		print.info(`Usage: mk-cli <command> [options]

Options:
  -v, --version                              output the version number
  -h, --help                                 output usage information
  -t, -t <template>                          use external template
  -y                                         use default settings 

Commands:
  add [options] <app-name>     create a new project
  `)
	}
}

module.exports = command
