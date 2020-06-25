const path = require('path')

import { prompt, GluegunToolbox } from 'gluegun'
import { ICreateNewProjectDetails } from '../types'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.add_promptDetails = async (firstParam?: string) => {
		const { filesystem } = toolbox

		const defaultAppName = firstParam || path.basename(filesystem.path())

		const askAppName = {
			type: 'input',
			name: 'appName',
			message: 'Project name',
			default: defaultAppName
		}

		const askAppVersion = {
			type: 'input',
			name: 'appVersion',
			message: 'Version',
			default: '1.0.0'
		}

		const askAppDescription = {
			type: 'input',
			name: 'appDescription',
			message: 'Description'
		}

		const askAppAuthor = {
			type: 'input',
			name: 'appAuthor',
			message: 'Author',
			default: 'agent one co., ltd.'
		}

		const askVueModules = {
			type: 'multiselect',
			name: 'vueModules',
			message:
				'Choose Vue Modules (Press <space> to select, <a> to toggle all, <i> to invert selection)',
			choices: ['vue-meta', 'vue-router']
		}

		const askWantHttps = {
			type: 'confirm',
			name: 'wantHttps',
			message: 'Want HTTPS?'
		}

		const questions = [
			askAppName,
			askAppVersion,
			askAppDescription,
			askAppAuthor,
			askVueModules,
			askWantHttps
		]

		const details: ICreateNewProjectDetails = await prompt.ask(questions)

		if (details.wantHttps) {
			const askCertPath = {
				type: 'input',
				name: 'httpsCertPath',
				message: 'Cert Path',
				default: '.'
			}

			const askKeyPath = {
				type: 'input',
				name: 'httpsKeyPath',
				message: 'Key Path',
				default: '.'
			}

			const httpsQuestions = [askCertPath, askKeyPath]

			await prompt.ask(httpsQuestions)
		}

		return details
	}
}
