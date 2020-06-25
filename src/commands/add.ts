const path = require('path')

import { GluegunCommand, prompt } from 'gluegun'
import { ICreateNewProjectDetails } from '../types'

const command: GluegunCommand = {
	name: 'add',
	run: async toolbox => {
		const { print, parameters, strings, filesystem } = toolbox
		const {
			add_cloneBaseApp,
			add_promptDetails,
			add_promptTemplate,
			add_replaceBaseApp,
			add_generateFiles,
			add_installPackage
		} = toolbox

		const baseAppUrl = process.env.BASE_APP_URL

		if (strings.isBlank(baseAppUrl)) {
			throw new Error('⚠️  BASE_APP_URL is not found.')
		}

		const options = parameters.options
		const firstParam = parameters.first

		const defaultAppName = firstParam || path.basename(filesystem.path())

		const defaultDetails: ICreateNewProjectDetails = {
			appName: defaultAppName,
			appVersion: '1.0.0',
			appDescription: '',
			appAuthor: 'agent one co., ltd.',
			vueModules: [],
			wantHttps: false
		}

		// default, use all default setup
		if (options.y) {
			await add_cloneBaseApp(baseAppUrl)

			if (!strings.isNotString(options.y)) {
				defaultDetails.appName = options.y
			}

			const cmdStrPath = `${filesystem.path()}/${defaultDetails.appName}`

			print.info('💾 Installing to ' + cmdStrPath)

			await add_replaceBaseApp(defaultDetails.appName)

			await add_generateFiles(cmdStrPath, defaultDetails)

			await add_installPackage(cmdStrPath)

			return
		}

		const haveGit = await prompt.confirm('Have Git?')

		if (!haveGit) {
			throw new Error('⚠️  should have git for create a new project.')
		}

		await add_cloneBaseApp(baseAppUrl)

		// use template external
		if (options.t) {
			if (strings.isNotString(options.t)) {
				const templates = toolbox.filesystem.subdirectories('mk-base')

				const details = await add_promptTemplate(templates)

				await add_replaceBaseApp(
					defaultDetails.appName,
					details.template
				)
			} else {
				await add_replaceBaseApp(defaultDetails.appName, options.t)
			}

			const cmdStrPath = `${filesystem.path()}/${defaultDetails.appName}`

			print.info('💾 Installing to ' + cmdStrPath)

			await add_installPackage(cmdStrPath)

			return
		}

		const details: ICreateNewProjectDetails = await add_promptDetails(
			defaultDetails
		)

		const cmdStrPath = `${filesystem.path()}/${details.appName}`

		print.info('💾 Installing to ' + cmdStrPath)

		await add_replaceBaseApp(details.appName)

		await add_generateFiles(cmdStrPath, details)

		await add_installPackage(cmdStrPath)
	}
}

module.exports = command
