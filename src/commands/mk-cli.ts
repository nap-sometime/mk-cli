import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
	name: 'mk-cli',
	run: async toolbox => {
		const { print } = toolbox

		print.info('In processing!')
	}
}

module.exports = command
