import { GluegunCommand, prompt } from 'gluegun'

const command: GluegunCommand = {
	name: 'add',
	run: async toolbox => {
		const { print, parameters, strings, filesystem } = toolbox
		const {
			add_cloneBaseApp,
			add_promptDetails,
			add_generateFiles,
			add_installPackage
		} = toolbox

		const options = parameters.options

		// default, use all default setup
		if (options.y) {
			print.info('🐶 In Processing... ' + 'with y option')

			return
		}

		// use template external
		if (options.t) {
			print.info('🐶 In Processing... ' + 'with t option')

			return
		}

		const haveGit = await prompt.confirm('Have Git?')

		if (!haveGit) {
			throw new Error('⚠️  should have git for create a new project.')
		}

		const baseAppUrl = process.env.BASE_APP_URL

		if (strings.isBlank(baseAppUrl)) {
			throw new Error('⚠️  BASE_APP_URL is not found.')
		}

		await add_cloneBaseApp(baseAppUrl)

		const firstParam = parameters.first

		const cmdStrPath = strings.isBlank(firstParam)
			? filesystem.path()
			: `${filesystem.path()}/${firstParam}`

		const details = await add_promptDetails(firstParam)

		await add_generateFiles(cmdStrPath, details)

		await add_installPackage(cmdStrPath)
	}
}

module.exports = command
