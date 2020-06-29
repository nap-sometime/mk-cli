import { prompt, GluegunToolbox } from 'gluegun'
import { ICreateNewProjectDetails } from '../types'
import { Options } from 'gluegun/build/types/domain/options'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.add_promptDetails = async (
		defaultDetails: ICreateNewProjectDetails,
		options: Options
	) => {
		const { strings } = toolbox

		const askAppName = {
			type: 'input',
			name: 'appName',
			message: 'Project name',
			default: defaultDetails.appName
		}

		const askAppVersion = {
			type: 'input',
			name: 'appVersion',
			message: 'Version',
			default: defaultDetails.appVersion
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
			default: defaultDetails.appAuthor
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
			message: 'Want HTTPS?',
			default: defaultDetails.wantHttps
		}

		const optionVueModules = options.m

		const questions = strings.isNotString(optionVueModules)
			? [
					askAppName,
					askAppVersion,
					askAppDescription,
					askAppAuthor,
					askVueModules,
					askWantHttps
			  ]
			: [
					askAppName,
					askAppVersion,
					askAppDescription,
					askAppAuthor,
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

		if (!strings.isNotString(optionVueModules)) {
			details.vueModules = optionVueModules.split(',')
		}

		return details
	}
}
