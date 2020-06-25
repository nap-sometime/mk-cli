import { GluegunToolbox, prompt } from 'gluegun'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.add_promptTemplate = async (templateList: string[]) => {
		const questions = [
			{
				type: 'select',
				name: 'template',
				message: 'Choose Template',
				choices: templateList
			}
		]

		const template = await prompt.ask(questions)

		return template
	}
}
