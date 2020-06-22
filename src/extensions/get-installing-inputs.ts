const path = require('path')

import { prompt, GluegunToolbox } from 'gluegun'
import { IInstallingInputs } from '../types'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.getInstallingInputs = async (firstParameter?: string) => {
		const { filesystem } = toolbox

		const defaultAppName =
			firstParameter || path.basename(filesystem.path())

		const askAppName = {
			type: 'input',
			name: 'app_name',
			message: 'Project name',
			default: defaultAppName
		}

		const askAppVersion = {
			type: 'input',
			name: 'app_version',
			message: 'Version',
			default: '1.0.0'
		}

		const askAppDescription = {
			type: 'input',
			name: 'app_description',
			message: 'Description'
		}

		const askAppAuthor = {
			type: 'input',
			name: 'app_author',
			message: 'Author',
			default: 'agent one co., ltd.'
		}

		const askVueModules = {
			type: 'multiselect',
			name: 'vue_modules',
			message:
				'Choose Vue Modules (Press <space> to select, <a> to toggle all, <i> to invert selection)',
			choices: ['vue-meta', 'vue-router']
		}

		const askCertDirectory = {
			type: 'input',
			name: 'https_cert_dir',
			message: 'Cert Directory',
			default: '.'
		}

		const askKeyDirectory = {
			type: 'input',
			name: 'https_key_dir',
			message: 'Key Directory',
			default: '.'
		}

		const defaultQuestions = [
			askAppName,
			askAppVersion,
			askAppDescription,
			askAppAuthor,
			askVueModules
		]

		await prompt.ask(defaultQuestions)

		const wantHttps = await toolbox.prompt.confirm('Want HTTPS?')
		const httpsQuestion = wantHttps
			? [askCertDirectory, askKeyDirectory]
			: []

		const inputs: IInstallingInputs = await prompt.ask(httpsQuestion)

		return inputs
	}
}
