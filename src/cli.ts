import * as dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/.env` })

const { build } = require('gluegun')

async function run(argv) {
	const cli = build()
		.brand('mk-cli')
		.exclude(['semver', 'http', 'patching', 'package-manager'])
		.src(__dirname)
		.plugins('./node_modules', { matching: 'mk-cli-*', hidden: true })
		.help()
		.version()
		.create()
	const toolbox = await cli.run(argv)

	return toolbox
}

module.exports = { run }
