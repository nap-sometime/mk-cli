import { GluegunCommand, prompt } from 'gluegun'
import { ICreateNewProjectDetails } from '../types'

const command: GluegunCommand = {
	name: 'add',
	run: async toolbox => {
		const { print, parameters, strings, filesystem } = toolbox
		const {
			add_cloneBaseApp,
			add_promptDetails,
			add_replaceBaseApp,
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

		const details: ICreateNewProjectDetails = await add_promptDetails(
			firstParam
		)

		const appName = details.appName

		await add_replaceBaseApp(appName)

		const cmdStrPath = `${filesystem.path()}/${appName}`

		await add_generateFiles(cmdStrPath, details)

		await add_installPackage(cmdStrPath)
	}
}

module.exports = command
