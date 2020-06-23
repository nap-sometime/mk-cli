import { GluegunToolbox } from 'gluegun'
import { IInstallDetails } from '../types'

module.exports = async (toolbox: GluegunToolbox) => {
	toolbox.generateReadme = async (
		rootDir: string,
		inputs: IInstallDetails
	) => {
		const { template } = toolbox

		await template.generate({
			template: 'readme-md.ts.ejs',
			target: `${rootDir}/README.md`,
			props: inputs
		})
	}
}
