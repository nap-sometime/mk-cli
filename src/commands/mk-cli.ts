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
  install [options] <plugin> [pluginOptions]     install a plugin and invoke its generator in an already created project
		`)
	}
}

module.exports = command
